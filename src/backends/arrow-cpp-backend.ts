import { AsyncRecordBatchStreamReader } from "apache-arrow";
import { ArrowBackend } from "./arrow-backend";
import { PassThrough, Stream } from "stream";

export class ArrowCppBackend extends ArrowBackend {
  readParquet_: ((path: string, stream: Stream) => void) | undefined;

  async readParquet(path: string) {
      if (typeof (this.readParquet_) == 'undefined') {
        try {
          const module = await import("parquet-reader");
          this.readParquet_ = module.readParquet;
        } catch (error) {
          throw new Error(`cannot find prebuilt arrow module, either build the module or use another backend: ${error}`);
        }
      }
      const stream = new PassThrough;
      this.readParquet_(path, stream);
      return AsyncRecordBatchStreamReader.from(stream);
  }

}
