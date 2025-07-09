from conan import ConanFile
import platform

class ParquetReaderConan(ConanFile):
    name = "parquet-reader"
    version = "0.1"
    settings = "os", "compiler", "build_type", "arch"
    generators = "CMakeDeps"
    requires = (
        "arrow/14.0.1",
        "fmt/9.1.0"
    )

    def config_options(self):
        pass  # No need to set simd_level here; set it in default_options

    def configure(self):
        if self.settings.os == "Windows" and str(self.settings.arch).lower() in ["armv8", "armv8.3", "arm64"]:
            del self.options["arrow"].simd_level

    default_options = {
        "arrow/*:parquet": True,
        "arrow/*:with_thrift": True,
        "arrow/*:with_snappy": True,
        "arrow/*:with_zstd": True,
        "arrow/*:with_lz4": True,
        "arrow/*:with_brotli": True,
        "arrow/*:with_zlib": True,
    }
