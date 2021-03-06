# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="3.0.0"></a>
# [3.0.0](https://github.com/suin/node/compare/@suin/get-connpass-applicants@2.1.0...@suin/get-connpass-applicants@3.0.0) (2019-08-29)


### Features

* **get-connpass-applicants:** expose `ApplicantStatus` type ([a946acf](https://github.com/suin/node/commit/a946acf))
* **get-connpass-applicants:** renew APIs to improve reusability ([3c288a1](https://github.com/suin/node/commit/3c288a1))


### BREAKING CHANGES

* **get-connpass-applicants:** a lot of APIs was changed. No longer compatible with older APIs.





<a name="2.1.0"></a>
# [2.1.0](https://github.com/suin/node/compare/@suin/get-connpass-applicants@2.0.0...@suin/get-connpass-applicants@2.1.0) (2019-08-28)


### Bug Fixes

* **get-connpass-applicants:** fix missing of the 4th argument of `new Applicant()` in test code ([b589751](https://github.com/suin/node/commit/b589751))


### Builds

* **get-connpass-applicants:** separate tsconfig to lint/test one and build one ([5ee655d](https://github.com/suin/node/commit/5ee655d))


### Features

* **get-connpass-applicants:** add `status` field to `Applicant` ([46146ce](https://github.com/suin/node/commit/46146ce))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/suin/node/compare/@suin/get-connpass-applicants@1.2.0...@suin/get-connpass-applicants@2.0.0) (2019-08-28)


### Features

* **get-connpass-applicants:** remove deprecated `Applicants.prototype.name` ([4d84873](https://github.com/suin/node/commit/4d84873))


### BREAKING CHANGES

* **get-connpass-applicants:** `Applicants.prototype.name` is no longer available. use `Applicants.prototype.displayName` instead





<a name="1.2.0"></a>
# [1.2.0](https://github.com/suin/node/compare/@suin/get-connpass-applicants@1.1.5...@suin/get-connpass-applicants@1.2.0) (2019-08-28)


### Features

* **get-connpass-applicants:** `nickName` and `displayName` is added to `Applicant`. ([6f6d037](https://github.com/suin/node/commit/6f6d037))





<a name="1.1.5"></a>
## [1.1.5](https://github.com/suin/node/compare/@suin/get-connpass-applicants@1.1.4...@suin/get-connpass-applicants@1.1.5) (2019-08-27)


### Chores

* **get-connpass-applicants:** add types field to package.json ([212fd97](https://github.com/suin/node/commit/212fd97))
* **get-connpass-applicants:** exclude the test directory from the artifact ([1a29fe3](https://github.com/suin/node/commit/1a29fe3))





<a name="1.1.4"></a>
## [1.1.4](https://github.com/suin/node/compare/@suin/get-connpass-applicants@1.1.3...@suin/get-connpass-applicants@1.1.4) (2019-08-27)


### Tests

* **get-connpass-applicants:** add a test for Applicants.participantsByParticipationType with one pa ([8378be5](https://github.com/suin/node/commit/8378be5))





<a name="1.1.3"></a>
## [1.1.3](https://github.com/suin/node/compare/@suin/get-connpass-applicants@1.1.2...@suin/get-connpass-applicants@1.1.3) (2019-08-27)


### Code Refactoring

* **get-connpass-applicants:** change the class name from EventParticipantPage to ParticipationP ([285b252](https://github.com/suin/node/commit/285b252))





<a name="1.1.2"></a>
## [1.1.2](https://github.com/suin/node/compare/@suin/get-connpass-applicants@1.1.1...@suin/get-connpass-applicants@1.1.2) (2019-08-27)


### Chores

* **get-connpass-applicants:** set homepage and repository in package.json ([03b1c0a](https://github.com/suin/node/commit/03b1c0a))





<a name="1.1.1"></a>
## [1.1.1](https://github.com/suin/node/compare/@suin/get-connpass-applicants@1.1.0...@suin/get-connpass-applicants@1.1.1) (2019-08-27)


### Chores

* **get-connpass-applicants:** set publishConfig.access = "public" in package.json ([7852905](https://github.com/suin/node/commit/7852905))





<a name="1.1.0"></a>
# 1.1.0 (2019-08-27)


### Features

* **get-connpass-applicants:** add initial implementation ([83938e0](https://github.com/suin/node/commit/83938e0))


### Tests

* **get-connpass-applicants:** add a test assertion for Applicants.participantsByParticipationType ([2b67ccb](https://github.com/suin/node/commit/2b67ccb))
