# Changelog

### [0.20230403.1](https://www.github.com/RIPE-NCC/ipv6-security-lab/compare/v0.20230403.0...v0.20230403.1) (2024-08-15)


### Bug Fixes

* fix Debian Stretch repo location ([f42f93d](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/f42f93d4661e7d40b30b2604374b3ecc2e9decd0))
* switch to official Ubuntu images ([5b152de](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/5b152de185cea89735d313d8231443b2e5eedbc4))

## [0.20230403.0](https://www.github.com/RIPE-NCC/ipv6-security-lab/compare/v0.20221114.0...v0.20230403.0) (2023-04-03)


### Features

* support Ubuntu auto-install, upgrade host to Ubuntu 22.04 ([b34e011](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/b34e0116adf75bf18aada1e71f320d6c0884d69c))


### Bug Fixes

* remove obsolete Ansible syntax ([ddb8601](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/ddb86017a5e66b0b4c679dac4526cb51af2cb440))


### Miscellaneous Chores

* release 0.20230403.0 ([c13aad6](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/c13aad6162ae6713fdf7d5d4fdd90ab4514fa4c9))

## [0.20221114.0](https://www.github.com/RIPE-NCC/ipv6-security-lab/compare/v0.20211020.1...v0.20221114.0) (2022-11-14)


### Features

* frontend update ([d4464f5](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/d4464f5b5e61474efb9225c033d52d7175ff8f73))
* Upgrade ttyd to 1.7.2 ([28991b9](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/28991b91f42ec52b87479abe1d2bffeb1b302a2d))

### [0.20211020.1](https://www.github.com/RIPE-NCC/ipv6-security-lab/compare/v0.20211020.0...v0.20211020.1) (2021-10-20)


### Bug Fixes

* use macos-10.15 in GitHub action ([741758c](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/741758cc50ea57b23fbd97d26f78e7c7988418cb))

## [0.20211020.0](https://www.github.com/RIPE-NCC/ipv6-security-lab/compare/v0.20210814.0...v0.20211020.0) (2021-10-20)


### Features

* update Termshark to 2.3.0 ([5026edc](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/5026edc61a88618dca4a72c718e22bd21ddccd92))


### Bug Fixes

* ansible-base got renamed to ansible-core ([b7f39c0](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/b7f39c0a90c4f0ec29b1d17c291c38cb83e73d07))
* update web frontend to the latest version ([6c213b9](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/6c213b9214a017442f49353adc1a06aa603a3bdb))
* Use rsync instead of shared folders ([ee1de25](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/ee1de255f5780d974aa88b59f2293855014c6e65))

## [0.20210814.0](https://www.github.com/RIPE-NCC/ipv6-security-lab/compare/v0.20210813.0...v0.20210814.0) (2021-08-17)


### Features

* Disable multicast snooping on lxdbr0 by default ([2580b2c](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/2580b2c63d704a147e5dcc7c1a54bebe9040b9ae))
* frontend update ([c47e88e](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/c47e88eeacd48ee296ee9ab67a61aea1c87e59ad))


### Bug Fixes

* disable shared folder, workaround serial port issue on Windows ([5938407](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/5938407dcd8921839591ce9ae16018cb160d53ff))

## [0.20210813.0](https://www.github.com/RIPE-NCC/ipv6-security-lab/compare/v0.20210709.0...v0.20210813.0) (2021-08-13)


### Bug Fixes

* ensure exact version of base box ([972b4e1](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/972b4e1125cf4566d37b71e51d02bd81b05d41c0))
* workaround ignored ICMPv6 redirects ([60313d1](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/60313d14532f414794289dcbcee06caf3be99f60))

## 0.20210709.0 (2021-07-09)


### Features

* add Vagrantfile-in-box to be part of the box ([526e619](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/526e619ac00eb774e438eef8bc8865b6f4b3fe89))
* fixed MAC address of the virtual router ([520f09a](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/520f09a4fc51470254a39873069b03dc9190bc14))
* replace the frontend with a RIPE NCC styled one ([a10183f](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/a10183f9f388a4b1690a015f0e79cdf7dae48760))
* switch to ubuntu/focal64 base box ([5fa8f70](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/5fa8f70003cbe54eefdb142833dbb66bbcfa1615))


### Bug Fixes

* frontend: small adjustments ([bb221aa](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/bb221aa61c429c2f95e869259449234ebb5f73fb))
* frontend: Workaround broken iframe resize on Firefox ([0cbdbc6](https://www.github.com/RIPE-NCC/ipv6-security-lab/commit/0cbdbc61ae4afac4212f4c0c9d01310d95502218))
