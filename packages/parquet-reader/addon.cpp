#include <arrow/api.h>
#include <arrow/io/api.h>
#include <arrow/ipc/writer.h>
#include <arrow/table.h>
#include <fmt/format.h>
#include <iostream>
#include <napi.h>
#include <parquet/arrow/reader.h>

namespace arrow_parquet_reader {


class Writer : public arrow::io::OutputStream
{
public:
  Writer(Napi::Env env, Napi::Object &stream)
    : env_{ env },
      stream_{ stream },
      write_{ stream.Get("write").As<Napi::Function>() },
      end_{ stream.Get("end").As<Napi::Function>() }
  {}

  Writer(const Writer &) = delete;
  Writer &operator=(const Writer &) = delete;

  ~Writer()
  {
    end_.Call(stream_, {});
  }

  arrow::Status Write(const void *data, std::int64_t nbytes) override
  {
    write_.Call(stream_, { Napi::Buffer<char>::Copy(env_, static_cast<char *>(const_cast<void *>(data)), nbytes) });

    position_ += nbytes;
    return arrow::Status::OK();
  }

  arrow::Status Close() override
  {
    end_.Call(stream_, {});

    closed_ = true;

    return arrow::Status::OK();
  }

  arrow::Result<std::int64_t> Tell() const override { return position_; }

  bool closed() const override { return closed_; }

private:
  Napi::Env env_;
  Napi::Object &stream_;
  Napi::Function write_;
  Napi::Function end_;
  std::int64_t position_ = 0;
  bool closed_ = false;
};

arrow::Status streamTable(Napi::Env env, const std::string &path, Napi::Object &stream)
{
  const auto infile = arrow::io::ReadableFile::Open(path);
  ARROW_RETURN_NOT_OK(infile.status());

  std::unique_ptr<parquet::arrow::FileReader> reader;
  ARROW_RETURN_NOT_OK(parquet::arrow::OpenFile(infile.ValueOrDie(), arrow::default_memory_pool(), &reader));

  std::shared_ptr<arrow::Table> table;
  ARROW_RETURN_NOT_OK(reader->ReadTable(&table));

  Writer writer{ env, stream };
  const auto options = [] {
    auto res = arrow::ipc::IpcWriteOptions::Defaults();
    res.write_legacy_ipc_format = true;
    return res;
  }();
  const auto streamWriter = arrow::ipc::MakeStreamWriter(&writer, table->schema(), options);
  ARROW_RETURN_NOT_OK(streamWriter);

  ARROW_RETURN_NOT_OK(streamWriter.ValueOrDie()->WriteTable(*table));

  return arrow::Status::OK();
}

void readParquet(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  const auto path = info[0].As<Napi::String>();
  auto stream = info[1].As<Napi::Object>();

  if (const auto status = streamTable(env, path, stream); !status.ok()) {
    Napi::Error::New(env, fmt::format("Failed to open {}: {}", std::string{ path }, status.message()))
      .ThrowAsJavaScriptException();
  }
}

}// namespace arrow_parquet_reader

static Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  using namespace arrow_parquet_reader;
  exports.Set("readParquet", Napi::Function::New(env, readParquet));
  return exports;
}

NODE_API_MODULE(arrow_parquet_reader, Init);
