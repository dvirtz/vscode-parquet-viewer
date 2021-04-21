[![Main](https://github.com/dvirtz/vscode-parquet-viewer/workflows/Main/badge.svg)](https://github.com/dvirtz/vscode-parquet-viewer/actions?query=workflow%3AMain) [![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/dvirtz.parquet-viewer)](https://marketplace.visualstudio.com/items?itemName=dvirtz.parquet-viewer)

# parquet-viewer

Views [Apache Parquet](https://parquet.apache.org/) files as JSON.

Requires [parquet-tools](https://mvnrepository.com/artifact/org.apache.parquet/parquet-tools).

## Features

When opening a Parquet file, a JSON presentation of the file will open automatically:

![automatic](images/automatic.gif)

After closing the JSON view, it is possible to reopen it by clicking on the link in the parquet view.

![command](images/reopen.gif)

## Requirements

The extension requires [parquet-tools](https://github.com/apache/parquet-mr/tree/master/parquet-tools-deprecated).
It should be in your PATH, or a path can be set in settings.

![settings](images/settings.png)

## Settings

The following setting options are available:

|name|default|description|
|----|-------|-----------|
|`parquet-viewer.parquetToolsPath`|`parquet-tools`| the name of the parquet-tools executable or a path to the parquet-tools jar|
|`parquet-viewer.logPanel`|`false`|whether to write diagnostic logs to an output panel|
|`parquet-viewer.logFolder`|empty|Write diagnostic logs under the given directory|
|`parquet-viewer.logLevel`|info|Diagnostic log level. Choose between: `off`, `fatal`, `error`, `warn`, `info`, `debug` or `trace`|

### What's new

See [CHANGELOG.md](CHANGELOG.md)
