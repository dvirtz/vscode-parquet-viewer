## [2.7.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.6.5...v2.7.0) (2024-02-04)


### Features

* format JSON as an array ([a44d406](https://github.com/dvirtz/vscode-parquet-viewer/commit/a44d406159272efda52c895324aea88de96c2eb5)), closes [#98](https://github.com/dvirtz/vscode-parquet-viewer/issues/98)


### General maintenance

* remove redundant file ([955a9a7](https://github.com/dvirtz/vscode-parquet-viewer/commit/955a9a73c424aca7dfa24a7611dcd5338abcbd2d))


### Refactoring

* move JSON creation to base class ([c7d381c](https://github.com/dvirtz/vscode-parquet-viewer/commit/c7d381c1211321ac18026e57fea16bc1b0b70fba))

## [2.6.5](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.6.4...v2.6.5) (2024-02-02)


### Bug Fixes

* support LargeUtf8 by upgrading apache-arrow ([66efa57](https://github.com/dvirtz/vscode-parquet-viewer/commit/66efa57dc9cde40cfca31696de6ffd2301659b60)), closes [#105](https://github.com/dvirtz/vscode-parquet-viewer/issues/105)

## [2.6.4](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.6.3...v2.6.4) (2024-01-28)


### Bug Fixes

* opening large files ([6d2164f](https://github.com/dvirtz/vscode-parquet-viewer/commit/6d2164f214e01decd5ac725c52f602050f56021e)), closes [#114](https://github.com/dvirtz/vscode-parquet-viewer/issues/114) [#74](https://github.com/dvirtz/vscode-parquet-viewer/issues/74)

## [2.6.3](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.6.2...v2.6.3) (2024-01-21)


### Bug Fixes

* require VSCode 1.66.0 ([6672fc0](https://github.com/dvirtz/vscode-parquet-viewer/commit/6672fc0114944d99722530bf730ce52044881ebd))


### Tests

* run integration tests on earliest supported version ([753ed75](https://github.com/dvirtz/vscode-parquet-viewer/commit/753ed75df729c5dd5953b2a8c0e167a8c6d0ba97))

## [2.6.2](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.6.1...v2.6.2) (2024-01-12)


### General maintenance

* **deps:** bump jinja2 from 3.1.2 to 3.1.3 in /packages/parquet-reader ([4af5efb](https://github.com/dvirtz/vscode-parquet-viewer/commit/4af5efb456df63553c53891f972cbb8b61b3cd5c))

## [2.6.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.6.0...v2.6.1) (2024-01-12)


### Build and continuous integration

* use two workflows for dependabot PRs ([f377885](https://github.com/dvirtz/vscode-parquet-viewer/commit/f377885f943b2db01d9ce5e811165290602df38e)), closes [/github.com/dependabot/dependabot-core/issues/3253#issuecomment-852541544](https://github.com/dvirtz//github.com/dependabot/dependabot-core/issues/3253/issues/issuecomment-852541544)


### General maintenance

* **deps-dev:** bump follow-redirects from 1.15.3 to 1.15.4 ([cb8b8de](https://github.com/dvirtz/vscode-parquet-viewer/commit/cb8b8de1225832288ea3108ef2175cb7c3d7ee16))

## [2.6.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.5.1...v2.6.0) (2024-01-07)


### Features

* add parquet-wasm backend ([e5e2819](https://github.com/dvirtz/vscode-parquet-viewer/commit/e5e28199ce9762aec6bb617bcbbd404393c12545)), closes [#107](https://github.com/dvirtz/vscode-parquet-viewer/issues/107)

## [2.5.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.5.0...v2.5.1) (2023-12-15)


### Bug Fixes

* fail loading arrow backend ([2f96587](https://github.com/dvirtz/vscode-parquet-viewer/commit/2f965879cf33b04d3a287b2aa60eb7245c41a421)), closes [#102](https://github.com/dvirtz/vscode-parquet-viewer/issues/102)


### Tests

* retry parquet backend test ([32833d6](https://github.com/dvirtz/vscode-parquet-viewer/commit/32833d69fc8a25c5e9589f654f83719c3fcf12f5))

## [2.5.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.4.5...v2.5.0) (2023-12-14)


### Features

* support `gzip`, `brotli`, and `lz4` compressions ([95d1fef](https://github.com/dvirtz/vscode-parquet-viewer/commit/95d1fef828e9cbf3663267b10bce16cfb194fcbf)), closes [#102](https://github.com/dvirtz/vscode-parquet-viewer/issues/102)


### Build and continuous integration

* log build URL ([6e23e6e](https://github.com/dvirtz/vscode-parquet-viewer/commit/6e23e6e62610f607e987f11101a5d4d61a6a4bfa))
* update npm in codemagic ([48380a3](https://github.com/dvirtz/vscode-parquet-viewer/commit/48380a3ff685f00a80aad4bd6056216dc7c87f7f))


### General maintenance

* bump dependencies ([1b8f886](https://github.com/dvirtz/vscode-parquet-viewer/commit/1b8f8869049bb7075ce0f6acd5f75f9b2a6b1a3a))
* disable git hooks during rebase ([304c84d](https://github.com/dvirtz/vscode-parquet-viewer/commit/304c84d9e3a75e9252e0e49fb9444b1ac8236b76))

## [2.4.5](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.4.4...v2.4.5) (2023-11-01)


### Bug Fixes

* support older platforms ([7a5399b](https://github.com/dvirtz/vscode-parquet-viewer/commit/7a5399bce272c545eb0df701f7a7e34b34c7622b)), closes [#99](https://github.com/dvirtz/vscode-parquet-viewer/issues/99)


### Build and continuous integration

* fix caching keys ([cafe6ad](https://github.com/dvirtz/vscode-parquet-viewer/commit/cafe6ad619835b7c354f39e817a8955d9d388797))

## [2.4.4](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.4.3...v2.4.4) (2023-10-30)


### Bug Fixes

* run apple-m1 using node 16 ([e61fbcc](https://github.com/dvirtz/vscode-parquet-viewer/commit/e61fbccdd0b6ec388c8895726c677a6c852108b4))


### Build and continuous integration

* fix codemagic caching ([ea31d19](https://github.com/dvirtz/vscode-parquet-viewer/commit/ea31d19a2bb0f612652d569242a13248a2b11da4))
* run apple-m1 using node 16 ([b1ac811](https://github.com/dvirtz/vscode-parquet-viewer/commit/b1ac811fba7d7e44dfed62a144c021e2bd6c63e6))

## [2.4.3](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.4.2...v2.4.3) (2023-10-26)


### General maintenance

* **deps:** bump urllib3 in /packages/parquet-reader ([c8958bb](https://github.com/dvirtz/vscode-parquet-viewer/commit/c8958bbb936b358afbc2254dbda086c6beb14417))

## [2.4.2](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.4.1...v2.4.2) (2023-10-25)


### General maintenance

* add logging ([bef5dd9](https://github.com/dvirtz/vscode-parquet-viewer/commit/bef5dd9c074e45f5fc37684cd78b6df6f05c0ebd))

## [2.4.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.4.0...v2.4.1) (2023-10-22)


### Build and continuous integration

* add codemagic pipeline ([2095487](https://github.com/dvirtz/vscode-parquet-viewer/commit/209548736e1f1e096efa6decc81ebc449c60a365))
* ignore conan-cache ([e2228aa](https://github.com/dvirtz/vscode-parquet-viewer/commit/e2228aa630a5777191dfeb5183ce7c96de891de9))


### Tests

* exclude parquet-tools when running on M1 ([8227c90](https://github.com/dvirtz/vscode-parquet-viewer/commit/8227c90e8cae974b194f01949131f74533527c1d))

## [2.4.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.3.5...v2.4.0) (2023-10-13)


### Features

* add zstd support to arrow backend ([195a688](https://github.com/dvirtz/vscode-parquet-viewer/commit/195a688e7cf7214371bd6a1a5b658826731a38e0)), closes [#90](https://github.com/dvirtz/vscode-parquet-viewer/issues/90)
* make arrow the default backend ([547ac84](https://github.com/dvirtz/vscode-parquet-viewer/commit/547ac849b958417d2f384f4bce754104f65de325))


### Build and continuous integration

* fix conan recipe revisions ([bf15cd1](https://github.com/dvirtz/vscode-parquet-viewer/commit/bf15cd1f678d42bac7d49e7ea0a2d065a95f0965))
* upgrade use node 18 everywhere ([c50d64d](https://github.com/dvirtz/vscode-parquet-viewer/commit/c50d64d9258a0db9b4b1d3033616e08600c2cf87))

## [2.3.5](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.3.4...v2.3.5) (2023-10-10)


### General maintenance

* **deps:** bump urllib3 in /packages/parquet-reader ([622b831](https://github.com/dvirtz/vscode-parquet-viewer/commit/622b8313b7fa90c886f05dafd9e58b170aac8782))

## [2.3.4](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.3.3...v2.3.4) (2023-09-20)


### Bug Fixes

* fix infinite load on error ([f5967fa](https://github.com/dvirtz/vscode-parquet-viewer/commit/f5967fa0ad0474de550f778519a2d862a49b1284)), closes [#85](https://github.com/dvirtz/vscode-parquet-viewer/issues/85)


### Refactoring

* deduplicate backend unit tests ([ad14d07](https://github.com/dvirtz/vscode-parquet-viewer/commit/ad14d079d3002c58c49887637bb156207f410e83))


### General maintenance

* add python extension to devcontainer ([32857de](https://github.com/dvirtz/vscode-parquet-viewer/commit/32857ded425f35a3a54915a90e370665087e235e))
* update dependencies ([6b6c7d3](https://github.com/dvirtz/vscode-parquet-viewer/commit/6b6c7d3c5a0ca014648b8c6a36e3c179ae3c6ae7))


### Build and continuous integration

* update to node 18 ([407504a](https://github.com/dvirtz/vscode-parquet-viewer/commit/407504a9d8fa15f6f035d0837578f567939b4d7e))
* upgrade to conan 2.x ([655dab3](https://github.com/dvirtz/vscode-parquet-viewer/commit/655dab3fc518d531de8ba2e40ce99ec17042bcb9))

## [2.3.3](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.3.2...v2.3.3) (2023-07-30)


### Bug Fixes

* import arrow dynamically to avoid failed loading ([2774fe1](https://github.com/dvirtz/vscode-parquet-viewer/commit/2774fe1c78415b0277180a74678e99c49291e542)), closes [#83](https://github.com/dvirtz/vscode-parquet-viewer/issues/83)


### General maintenance

* don't spellcheck changelog ([198367b](https://github.com/dvirtz/vscode-parquet-viewer/commit/198367bb30e83b93c6f4017fafc7e03827c7a1d9))


### Refactoring

* factor cancellation to base class ([1e5a261](https://github.com/dvirtz/vscode-parquet-viewer/commit/1e5a2618c2c612f8ac8ab5eb10874903d39d4cd2))

## [2.3.2](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.3.1...v2.3.2) (2023-07-28)


### General maintenance

* **deps:** bump certifi in /packages/parquet-reader ([6e23e1d](https://github.com/dvirtz/vscode-parquet-viewer/commit/6e23e1dc05ae1efed830f3c31f57f77cd7247fb5))

## [2.3.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.3.0...v2.3.1) (2023-07-27)


### Bug Fixes

* move pkg-prebuilds should be a runtime dep ([58c15af](https://github.com/dvirtz/vscode-parquet-viewer/commit/58c15af53fda75006a487cff93cd8b5bfcdb021a)), closes [#81](https://github.com/dvirtz/vscode-parquet-viewer/issues/81)


### General maintenance

* **deps-dev:** bump word-wrap from 1.2.3 to 1.2.4 ([3c743be](https://github.com/dvirtz/vscode-parquet-viewer/commit/3c743bea14aee8fa697dec8642f1af981801e104))


### Build and continuous integration

* build only typescript when packaging ([4acc829](https://github.com/dvirtz/vscode-parquet-viewer/commit/4acc829cf85d2a010971992e3c045b4142551dca))
* disable hooks in CI ([947f61b](https://github.com/dvirtz/vscode-parquet-viewer/commit/947f61b7ac6a3bfbcefde0ea30f93a9369da34d6))
* download prebuilds before install ([43c03d9](https://github.com/dvirtz/vscode-parquet-viewer/commit/43c03d9147c786a1278f2d38adb3e298d592db1a))
* ignore workspaces on release ([164abbe](https://github.com/dvirtz/vscode-parquet-viewer/commit/164abbeda0547b54c463bf6eee2a1e46417a5a25)), closes [#76](https://github.com/dvirtz/vscode-parquet-viewer/issues/76)

## [2.3.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.2.2...v2.3.0) (2023-07-17)


### Features

* add arrow backend ([078103d](https://github.com/dvirtz/vscode-parquet-viewer/commit/078103df72d399a003b9981c5a198eedca875a39))


### Bug Fixes

* reconfigure logger on settings change ([fbd6bcc](https://github.com/dvirtz/vscode-parquet-viewer/commit/fbd6bcce4ec063da53fffb874264ce944d195373))


### General maintenance

* fix commit message spellcheck ([cfa14f2](https://github.com/dvirtz/vscode-parquet-viewer/commit/cfa14f263af243f13c1096a5b03a4c4b469c76d0))
* organize gitignore ([9fa945b](https://github.com/dvirtz/vscode-parquet-viewer/commit/9fa945b7aab28ee3265bb199a816656e21de6847))

## [2.2.2](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.2.1...v2.2.2) (2022-10-15)


### General maintenance

* bump version ([#62](https://github.com/dvirtz/vscode-parquet-viewer/issues/62)) ([889ce1d](https://github.com/dvirtz/vscode-parquet-viewer/commit/889ce1da01c2175acbaac75319e48c77b763abe8))

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
