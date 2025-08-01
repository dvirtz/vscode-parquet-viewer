## [2.11.3](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.11.2...v2.11.3) (2025-07-15)


### Build and continuous integration

* debug using code spaces ([70523f4](https://github.com/dvirtz/vscode-parquet-viewer/commit/70523f46b7161225d28ca9ac48adc0f2acbfc6d1))
* move cmake-js to workspace ([457dca1](https://github.com/dvirtz/vscode-parquet-viewer/commit/457dca14aefcd702b3384067c0c4b7c7002909ed))
* restore Intel MacOS and add ARM Linux ([d4bae8f](https://github.com/dvirtz/vscode-parquet-viewer/commit/d4bae8fac36e21ff254db400c9bfdee1cae8a50e))
* switch to uv ([9e0f319](https://github.com/dvirtz/vscode-parquet-viewer/commit/9e0f319747f3ae7cff1d877f96fa66a5c477582b))
* update cmake ([72115c8](https://github.com/dvirtz/vscode-parquet-viewer/commit/72115c82ec2cef2033df94252bc0fa94f393b6ac))


### General maintenance

* fix pre commit script ([42b8dcc](https://github.com/dvirtz/vscode-parquet-viewer/commit/42b8dccbabc0a7e6bff6f0449e843712630937a1))

## [2.11.2](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.11.1...v2.11.2) (2025-06-08)


### Tests

* skip check for parquet-tools cancellation ([b8c7ab2](https://github.com/dvirtz/vscode-parquet-viewer/commit/b8c7ab273ebe04ffcc28f015632535cc01d220c5))


### Build and continuous integration

* **deps-dev:** bump axios from 1.7.5 to 1.8.4 ([a31bd4a](https://github.com/dvirtz/vscode-parquet-viewer/commit/a31bd4a40d6abb4494d6cd0dee7442ccddd5a312))
* **deps-dev:** bump tar-fs from 2.1.1 to 2.1.2 ([a352f13](https://github.com/dvirtz/vscode-parquet-viewer/commit/a352f13ce385eee3fff217b90522da8dbb9cf685))
* **deps-dev:** bump tar-fs from 2.1.2 to 2.1.3 ([a2f0a9c](https://github.com/dvirtz/vscode-parquet-viewer/commit/a2f0a9cbb8435532e1d49b2f39b1b8e47a855599))
* **deps:** bump esbuild and tsx ([594e1ea](https://github.com/dvirtz/vscode-parquet-viewer/commit/594e1eaf561224d92902a2e2c32032e309ef5ff4))
* **deps:** bump jinja2 from 3.1.4 to 3.1.6 in /packages/parquet-reader ([75ffee6](https://github.com/dvirtz/vscode-parquet-viewer/commit/75ffee68dda334a6c5324a4db816601e8056c3b2))
* invalidate conan cache when version changes ([65e92c7](https://github.com/dvirtz/vscode-parquet-viewer/commit/65e92c767efe1d403ff314530894d471ade2e19b))
* remove macos-12 ([1f93b00](https://github.com/dvirtz/vscode-parquet-viewer/commit/1f93b0062e7106b356eb7b015bf26a0d5afec981))
* upgrade build machines ([d12c1dc](https://github.com/dvirtz/vscode-parquet-viewer/commit/d12c1dcb8d9b240ecce598a8633e8f5579c8ddd3))

## [2.11.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.11.0...v2.11.1) (2024-09-08)


### Bug Fixes

* restore parquet-reader symbolic link ([a0318d8](https://github.com/dvirtz/vscode-parquet-viewer/commit/a0318d8db6072d82b2554a621ecc2ade1cb03647)), closes [#140](https://github.com/dvirtz/vscode-parquet-viewer/issues/140)

## [2.11.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.10.0...v2.11.0) (2024-09-07)


### Features

* deprecate parquet-tools and parquets backends ([6b6dd10](https://github.com/dvirtz/vscode-parquet-viewer/commit/6b6dd1027ceca336aab86f452d08ff7a74737d09)), closes [#137](https://github.com/dvirtz/vscode-parquet-viewer/issues/137)


### Bug Fixes

* remove workspaces from VSCE package ([1c0290f](https://github.com/dvirtz/vscode-parquet-viewer/commit/1c0290f57687b1832f536b8421003abdd25988ed)), closes [#138](https://github.com/dvirtz/vscode-parquet-viewer/issues/138)
* require a newer VSCode ([f3f4b79](https://github.com/dvirtz/vscode-parquet-viewer/commit/f3f4b79e999efe28a41d2be3e4818cc686523a78))


### Build and continuous integration

* **deps-dev:** bump axios from 1.6.8 to 1.7.5 ([42109c3](https://github.com/dvirtz/vscode-parquet-viewer/commit/42109c3eb5fbe8c4f47e46e7ea2d00f43241f1ab))

## [2.10.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.9.0...v2.10.0) (2024-08-26)


### Features

* make all backends and formatters node streams ([65965cd](https://github.com/dvirtz/vscode-parquet-viewer/commit/65965cdd0e61b33f7d59fd12b354a6db004d9409)), closes [#128](https://github.com/dvirtz/vscode-parquet-viewer/issues/128)


### Build and continuous integration

* **deps-dev:** bump braces from 3.0.2 to 3.0.3 ([15e8fe6](https://github.com/dvirtz/vscode-parquet-viewer/commit/15e8fe654f0806e3fe5f8e9761ad12363b4db1b1))
* **deps:** bump certifi in /packages/parquet-reader ([f44d3c8](https://github.com/dvirtz/vscode-parquet-viewer/commit/f44d3c80bdcc43bb686e6ce14789c4f478394362))
* **deps:** bump urllib3 in /packages/parquet-reader ([a24371f](https://github.com/dvirtz/vscode-parquet-viewer/commit/a24371f3994a754e5a6a42d20202f5d98214760f))
* **deps:** bump ws from 5.2.3 to 5.2.4 ([284713b](https://github.com/dvirtz/vscode-parquet-viewer/commit/284713b26c9f84ace18e3fb06d1f0a777ac295f5))
* npm audit fix ([a84f55a](https://github.com/dvirtz/vscode-parquet-viewer/commit/a84f55a916b7ce3885bc9826799739d5bc37ff5a))
* test on Java 8 ([00d8b1d](https://github.com/dvirtz/vscode-parquet-viewer/commit/00d8b1d502af64ac2f8dbed319620727ea08cfd7))

## [2.9.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.8.4...v2.9.0) (2024-05-23)


### Features

* add CSV output option ([8b8b667](https://github.com/dvirtz/vscode-parquet-viewer/commit/8b8b6679d09389c746650bc3ee04d6445e5ff70a)), closes [#75](https://github.com/dvirtz/vscode-parquet-viewer/issues/75)


### Documentation

* add info about getting a richer view ([3dc4f62](https://github.com/dvirtz/vscode-parquet-viewer/commit/3dc4f6211f5b548fe78bdc29bcb2eb5f03e52dd0))

## [2.8.4](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.8.3...v2.8.4) (2024-05-21)


### Tests

* use node:test for integration tests ([9eb4674](https://github.com/dvirtz/vscode-parquet-viewer/commit/9eb4674987d16fc357a512f73f4dba44c3a20ba1))
* use node:test for running unit tests ([bcdbce2](https://github.com/dvirtz/vscode-parquet-viewer/commit/bcdbce22c2db647261dfc6e0d62cc4ab26d5f360))


### Build and continuous integration

* add a job to update conan lock file ([4300e49](https://github.com/dvirtz/vscode-parquet-viewer/commit/4300e496dc0f9547733fe2df3b6b64906806ea9f))
* fix update-lockfile job ([f289d14](https://github.com/dvirtz/vscode-parquet-viewer/commit/f289d14f03c3098900e13c104031b7d2e4ad7f75))
* replace action with command line ([adc707e](https://github.com/dvirtz/vscode-parquet-viewer/commit/adc707eee289395b9f2a1c9f95b89967085d0840))
* update conan lockfile ([d5d840e](https://github.com/dvirtz/vscode-parquet-viewer/commit/d5d840ebb095474fc15063ab48c6ce4c09a6ba78))
* upgrade macos build machine ([aa32190](https://github.com/dvirtz/vscode-parquet-viewer/commit/aa321903848b6fc6185ba577b81d3b318f7b1905))
* upgrade to node 21 ([56fbd9d](https://github.com/dvirtz/vscode-parquet-viewer/commit/56fbd9db79b72df990deec44fcc3e34b8b48d3a8))
* use conan lock file ([c1f0205](https://github.com/dvirtz/vscode-parquet-viewer/commit/c1f02055b7ec6267d1cdba4d404327a0de5a696f))

## [2.8.3](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.8.2...v2.8.3) (2024-05-06)


### General maintenance

* **deps:** bump jinja2 from 3.1.3 to 3.1.4 in /packages/parquet-reader ([d360957](https://github.com/dvirtz/vscode-parquet-viewer/commit/d360957bc8eb78a296619de59fe9eed974405222))

## [2.8.2](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.8.1...v2.8.2) (2024-05-01)


### General maintenance

* **deps:** bump idna from 3.4 to 3.7 in /packages/parquet-reader ([2371ddb](https://github.com/dvirtz/vscode-parquet-viewer/commit/2371ddb9d8ea6c351a971bc9e4f7a9e50c9309e8))

## [2.8.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.8.0...v2.8.1) (2024-04-12)


### Bug Fixes

* look for prebuilds in the root path ([8b94ae2](https://github.com/dvirtz/vscode-parquet-viewer/commit/8b94ae28abe2263167f24a80339d40fa16acfe7a))


### Build and continuous integration

* go back to `conanfile.txt` ([273aaf9](https://github.com/dvirtz/vscode-parquet-viewer/commit/273aaf993dba8cf95e95195532f9b4d661399b7f))


### General maintenance

* fix vscode tasks ([6b103f3](https://github.com/dvirtz/vscode-parquet-viewer/commit/6b103f30eb73634060eb1e2e91bdf908c00b7cba))

## [2.8.0](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.7.1...v2.8.0) (2024-04-08)


### Features

* update documents when settings change ([fee72cd](https://github.com/dvirtz/vscode-parquet-viewer/commit/fee72cdb8d896d67f897d644faea56cf49163b79)), closes [/github.com/dvirtz/vscode-parquet-viewer/issues/105#issuecomment-1984046929](https://github.com/dvirtz//github.com/dvirtz/vscode-parquet-viewer/issues/105/issues/issuecomment-1984046929)


### Tests

* avoid timeout when debugging ([2acf438](https://github.com/dvirtz/vscode-parquet-viewer/commit/2acf438b2a6125e84c09859f3c48c21edf01f009))


### Build and continuous integration

* avoid always having workspaces=true ([962b2b8](https://github.com/dvirtz/vscode-parquet-viewer/commit/962b2b8e28e6d0495cd3763c7f6595bc593ec1b2))
* fix caching ([e9edb77](https://github.com/dvirtz/vscode-parquet-viewer/commit/e9edb770fc9084d3ecf7f829cb5cd576c1a765f2))
* simplify prebuilds by building inside dist ([328247c](https://github.com/dvirtz/vscode-parquet-viewer/commit/328247c2a2f497c4c05c7c11a53d22be63af58a8))
* update actions to use node 20 ([e0a5252](https://github.com/dvirtz/vscode-parquet-viewer/commit/e0a5252bed09af6138f03843ad9c240ce39b5a80))
* use GitHub's M1 macOS runner ([147881d](https://github.com/dvirtz/vscode-parquet-viewer/commit/147881dc1f4a7c026b94f8ac4aed123edbc6b4b2))


### General maintenance

* add .vscode files ([3eb9d76](https://github.com/dvirtz/vscode-parquet-viewer/commit/3eb9d763798a8fd27e3cf665009988be035702b2))

## [2.7.1](https://github.com/dvirtz/vscode-parquet-viewer/compare/v2.7.0...v2.7.1) (2024-03-19)


### Bug Fixes

* Revert "ci: use two workflows for dependabot PRs" ([6cf44ca](https://github.com/dvirtz/vscode-parquet-viewer/commit/6cf44cadc8f3df8b022423f5cd0765fd7b595f79))


### General maintenance

* **deps-dev:** bump follow-redirects from 1.15.4 to 1.15.6 ([d9f1ab5](https://github.com/dvirtz/vscode-parquet-viewer/commit/d9f1ab590c90a1f295dfe15cd2df1b7cbd8a87ac))

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
