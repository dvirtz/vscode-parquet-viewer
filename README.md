[![Main](https://github.com/dvirtz/vscode-parquet-viewer/workflows/Main/badge.svg)](https://github.com/dvirtz/vscode-parquet-viewer/actions?query=workflow%3AMain) [![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/dvirtz.parquet-viewer)](https://marketplace.visualstudio.com/items?itemName=dvirtz.parquet-viewer)

# parquet-viewer

Views [Apache Parquet](https://parquet.apache.org/) files as JSON.

## Features

When opening a Parquet file, a JSON presentation of the file will open automatically:

![automatic](images/automatic.gif)

After closing the JSON view, it is possible to reopen it by clicking on the link in the parquet view.

![command](images/reopen.gif)

## Backends

The extension supports three different backends for parsing the files:

### parquets

This is the default backend. It uses the [parquets](https://github.com/dvirtz/parquets) TypeScript library, which is a fork of the unmaintained [kbajalc/parquets](https://github.com/kbajalc/parquets) library with some bug fixes.

It only supports parquet version 1.0.0.

### arrow

This backend is a thin wrapper around the [Apache Arrow C++](https://github.com/apache/arrow/tree/main/cpp) implementation and so should support latest and greatest parquet features.

It is currently in an experimental state. To use, set `parquet-viewer.backend` setting to `arrow`.

### parquet-tools

This is a legacy Java backend, using [parquet-tools](https://mvnrepository.com/artifact/org.apache.parquet/parquet-tools). To use that, you should set `parquet-viewer.backend` to `parquet-tools` and `paruqet-tools` should be in your `PATH`, or pointed by the `parquet-viewer.parquetToolsPath` setting.

![settings](images/settings.png)

## Settings

The following setting options are available:

|name|default|description|
|----|-------|-----------|
|`parquet-viewer.backend`|`parquets`|Which backend to use for reading the files|
|`parquet-viewer.logging.panel`|`false`|Whether to write diagnostic logs to an output panel|
|`parquet-viewer.logging.folder`|empty|Write diagnostic logs under the given directory|
|`parquet-viewer.logging.level`|info|Diagnostic log level. Choose between: `off`, `fatal`, `error`, `warn`, `info`, `debug` or `trace`|
|`parquet-viewer.jsonSpace`|0|JSON indentation space, passed to `JSON.stringify` as is, see [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters) for details. Doesn't apply when `parquet-viewer.backend` is `parquet-tools`.|
|`parquet-viewer.parquetToolsPath`|`parquet-tools`|The name of the parquet-tools executable or a path to the parquet-tools jar|

### What's new

See [CHANGELOG.md](CHANGELOG.md)
