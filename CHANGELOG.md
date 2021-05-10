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
