## [2.2.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.2.0...v2.2.1) (2022-10-14)


### Build and continuous integration

* fix vsce release ([f9dffb4](https://github.com/dvirtz/vscode-parquet-viewer/commit/f9dffb4773afa1e93f7417d01f4d1397fd8c28f2))
* move custom release rules to correct place ([1c726f4](https://github.com/dvirtz/vscode-parquet-viewer/commit/1c726f4efdc90c10ab3058ea78545210afbaa883))
* publish to OpenVSX ([12d80a3](https://github.com/dvirtz/vscode-parquet-viewer/commit/12d80a3e802fbb9cd1ffd3ee419ae2af2c75cea3)), closes [#56](https://github.com/dvirtz/vscode-parquet-viewer/issues/56)
* use npm plugin to update package.json ([689c3de](https://github.com/dvirtz/vscode-parquet-viewer/commit/689c3de0262d2dd6114aa40034a9e07660684eb9))


### General maintenance

* ignore comments when linting commits ([654d229](https://github.com/dvirtz/vscode-parquet-viewer/commit/654d229024eec4955b2ce01260813e7d53895e17))
* upgrade node action ([5990657](https://github.com/dvirtz/vscode-parquet-viewer/commit/59906579c1fd3b333af7beb339d905b8c0faf2c3))

## [2.2.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.1.5...v2.2.0) (2022-06-20)


### Features

* formatting JSON output ([5a61a8e](https://github.com/dvirtz/vscode-parquet-viewer/commit/5a61a8e52494718e469243e0d34923a9727ad59a)), closes [#43](https://github.com/dvirtz/vscode-parquet-viewer/issues/43)
* watch for file changes ([a38e633](https://github.com/dvirtz/vscode-parquet-viewer/commit/a38e63307e3c3ca12e7f72a96d02a4958d584f50)), closes [#38](https://github.com/dvirtz/vscode-parquet-viewer/issues/38)


### Documentation

* update readme with grouped logging options ([2ecf274](https://github.com/dvirtz/vscode-parquet-viewer/commit/2ecf2742f89192af9753cd20e44944eebdceb140))


### General maintenance

* allow longer footers ([e30ba3c](https://github.com/dvirtz/vscode-parquet-viewer/commit/e30ba3c8fe8e335e491209b07aa467d310f9783d))
* fix commitlint ([bfd5ddc](https://github.com/dvirtz/vscode-parquet-viewer/commit/bfd5ddc6d0ee3423f001e3bb68f338acc8be5807))
* group logging settings ([a2ad7e1](https://github.com/dvirtz/vscode-parquet-viewer/commit/a2ad7e129cc9d58e4da2c1a36b77239d3d20b969))


### Build and continuous integration

* disable mac builds ([e45ed4e](https://github.com/dvirtz/vscode-parquet-viewer/commit/e45ed4e162b52e263b4faebba57e89e3782ffa59))
* fix spelling ([45fdc11](https://github.com/dvirtz/vscode-parquet-viewer/commit/45fdc11322b9058e26562f066e78e32cbd312750))
* fix vsce step ([cd6e5a6](https://github.com/dvirtz/vscode-parquet-viewer/commit/cd6e5a6c2339999bb40400b6d0e970b05275dbd4))

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
