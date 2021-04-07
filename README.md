[![Main](https://github.com/dvirtz/vscode-parquet-viewer/workflows/Main/badge.svg)](https://github.com/dvirtz/vscode-parquet-viewer/actions?query=workflow%3AMain) [![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/dvirtz.parquet-viewer)](https://marketplace.visualstudio.com/items?itemName=dvirtz.parquet-viewer)

# parquet-viewer

Views [Apache Parquet](https://parquet.apache.org/) files as JSON.

## Features

When opening a Parquet file, a JSON presentation of the file will open automatically:

![automatic](images/automatic.gif)

After closing the JSON view, it is possible to reopen it by clicking on the link in the parquet view.

![command](images/reopen.gif)

## Requirements

The extension used to require [parquet-tools](https://mvnrepository.com/artifact/org.apache.parquet/parquet-tools).
Now the extension uses the [parquets](https://github.com/dvirtz/parquets) TypeScript library to do parse the files.

If you still want to use `parquet-tools`, you should set `parquet-viewer.useParquetTools` to `true` and `paruqet-tools` should be in your `PATH`, or pointed by the `parquet-viewer.parquetToolsPath` setting.

![settings](images/settings.png)

## Settings

The following setting options are available:

|name|default|description|
|----|-------|-----------|
|`parquet-viewer.parquetToolsPath`|`parquet-tools`|The name of the parquet-tools executable or a path to the parquet-tools jar|
|`parquet-viewer.logPanel`|`false`|Whether to write diagnostic logs to an output panel|
|`parquet-viewer.logFolder`|empty|Write diagnostic logs under the given directory|
|`parquet-viewer.logLevel`|info|Diagnostic log level. Choose between: `off`, `fatal`, `error`, `warn`, `info`, `debug` or `trace`|
|`parquet-viewer.useParquetTools`|`false`|Use the legacy `parquet-tools` application for reading the files|

### What's new

See [CHANGELOG.md](CHANGELOG.md)
