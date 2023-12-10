from conan import ConanFile

class ParquetReaderConanfile(ConanFile):
    name = "parquet-reader"
    generators = "CMakeDeps"
    settings = "os", "compiler", "build_type", "arch"
    default_options = {
        "arrow/*:parquet": True,
        "arrow/*:with_snappy": True,
        "arrow/*:with_zlib": True,
        "arrow/*:with_zstd": True,
        "arrow/*:with_lz4": True,
        "arrow/*:with_brotli": True,
        # bypass recipe bugs
        "arrow/*:with_thrift": True,
        "arrow/*:with_re2": True,
    }

    # The requirements method allows you to define the dependencies of your recipe
    def requirements(self):
        # Each call to self.requires() will add the corresponding requirement
        # to the current list of requirements
        # Uncommenting this line will add the zlib/1.2.13 dependency to your project
        # self.requires("zlib/1.2.13")
        self.requires("arrow/14.0.1#d16fdc5db95e73a26ca56dfa9381d7d8")
        self.requires("fmt/9.1.0#f79808141cb396759a829be09dd5592c")
        self.requires("boost/1.82.0#7c9cc60d65d6942a56d4806ab85bda7c", override=True)
        pass
