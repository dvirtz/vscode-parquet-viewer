## [2.1.5](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.1.4...v2.1.5) (2022-06-17)


### General maintenance

* fix version ([36017e4](https://github.com/dvirtz/vscode-parquet-viewer/commit/36017e4e1838d7594082d948b14109bba74cdc79))
* increase commit max body line length ([054a4c2](https://github.com/dvirtz/vscode-parquet-viewer/commit/054a4c20fe845642cf53a91c8f2713f6bd83f36f))
* package less files ([cfcb7fe](https://github.com/dvirtz/vscode-parquet-viewer/commit/cfcb7fe75a09815726e9039ecbfa3de46c95dd0e))


### Build and continuous integration

* fix pushing to protected branch ([4ec31f6](https://github.com/dvirtz/vscode-parquet-viewer/commit/4ec31f6df454a7a3cf98e9ad3640b802287e460c))
* fix semantic-release config ([eef8646](https://github.com/dvirtz/vscode-parquet-viewer/commit/eef86462e006a4783dad27c288c9bf3f399e41d3))

## [2.1.3] - 2022-06-07

### Fixed

- [#42](https://github.com/dvirtz/vscode-parquet-viewer/issues/42)

## [2.1.2] - 2021-12-06

### Fixed

- [#35](https://github.com/dvirtz/vscode-parquet-viewer/issues/35)

## [2.1.1] - 2021-07-05

### Fixed

- [#27](https://github.com/dvirtz/vscode-parquet-viewer/issues/27)

## [2.1.0] - 2021-05-15

### Changed

- Support Workspace Trust [#24](https://github.com/dvirtz/vscode-parquet-viewer/issues/24)
- Upgrade dependencies

## [2.0.0] - 2021-05-11

### Changed

- Remove the dependency in `parquet-tools`

## [1.0.2] - 2021-03-22

### Changed

- Added diagnostic logging support
- CI: use eslint

## [1.0.1] - 2021-02-09

### Fixed

- fix error message box

## [1.0.0] - 2021-01-09

### Changed
- Uses Custom Editor [API](https://code.visualstudio.com/api/extension-guides/custom-editors) to remove the need for clicking "open it anyway".
- Show progress as JSON is generated, with an ability to cancel.
- **BREAKING** removed `View as JSON` command as it is redundant now.
- CI: check spelling with [cspell](https://github.com/streetsidesoftware/cspell/tree/master/packages/cspell).

## [0.1.4] - 2019-09-29
### Changed
- Made location of `parquet-tools` configurable.
- It's now possible to point it to a `parquet-tools` jar which will be then used for conversions.
`java` should be in `PATH` in that case.

### Fixed
- Running on Windows (https://github.com/dvirtz/vscode-parquet-viewer/issues/6)

## [0.1.3] - 2019-05-19
### Changed
- Documentation

## [0.1.2] - 2019-05-19
### Fixed
- Transparent icon background

## [0.1.1] - 2019-04-24
### Fixed
- 'out of buffer' error (https://github.com/dvirtz/vscode-parquet-viewer/issues/1)

## 0.1.0
- Initial release
