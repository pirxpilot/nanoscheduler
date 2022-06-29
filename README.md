[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @pirxpilot/nanoscheduler

Fork of [nanoscheduler]. Schedule work to be completed when the user agent is idle. Weighs 270 bytes
compressed.

## Usage
```js
var NanoScheduler = require('@pirxpilot/nanoscheduler')

var scheduler = NanoScheduler()
var i = 10000
while (i--) scheduler.push(() => console.log(`idle time! ${Date.now()}`))
```

## Why?
Just like with `window.requestAnimationFrame`, it's much more efficient to
share a single instance than to call it for each piece of work. There's a
significant overhead when scheduling small amounts of work. This package allows
sharing a scheduler as a singleton, which makes it particularly useful to be
shared between multiple applications.

## API
### `scheduler = NanoScheduler()`
Create a new scheduler instance. The instance is shared as a singleton on
`window` (if available).

### `scheduler.push(cb)`
Push a callback into the scheduler, to be executed when the user agent is idle.

## Installation
```sh
$ npm install @pirxpilot/nanoscheduler
```

## License
[Apache-2.0](./LICENSE)

[nanoscheduler]: https://npmjs.org/package/nanoscheduler

[npm-image]: https://img.shields.io/npm/v/@pirxpilot/nanoscheduler
[npm-url]: https://npmjs.org/package/@pirxpilot/nanoscheduler

[build-url]: https://github.com/pirxpilot/nanoscheduler/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/workflow/status/pirxpilot/nanoscheduler/check

[deps-image]: https://img.shields.io/librariesio/release/npm/@pirxpilot/nanoscheduler
[deps-url]: https://libraries.io/npm/@pirxpilot%2Fnanoscheduler
