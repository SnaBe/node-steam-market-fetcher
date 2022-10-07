# steam-market-fetcher
A Node.js wrapper for the Steam Community Market API.

[![npm version](https://img.shields.io/npm/v/steam-market-fetcher.svg)](https://npmjs.com/package/steam-market-fetcher)
[![node version](https://img.shields.io/node/v/steam-market-fetcher)](https://nodejs.org/en/about/releases/)
[![npm test](https://img.shields.io/github/workflow/status/SnaBe/node-steam-market-fetcher/Node.js%20%7C%20Ubuntu?logo=github)](https://github.com/SnaBe/node-steam-market-fetcher/actions/workflows/test.yml)
[![dependencies](https://img.shields.io/librariesio/release/npm/steam-market-fetcher)](https://www.npmjs.com/package/steam-market-fetcher)
[![npm downloads](https://img.shields.io/npm/dm/steam-market-fetcher.svg)](https://npmjs.com/package/steam-market-fetcher)
[![license](https://img.shields.io/npm/l/steam-market-fetcher.svg)](https://github.com/SnaBe/node-steam-market-fetcher/blob/master/LICENSE)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/snabe)

## Installation

Using [npm](https://www.npmjs.com/package/steam-market-fetcher):

```bash
$ npm install steam-market-fetcher
```

Using [yarn](https://yarnpkg.com/package/steam-market-fetcher):

```bash
$ yarn add steam-market-fetcher
```

## Testing

**Note**: Make sure you've supplied a valid `steamLoginSecure cookie` in the [test.js](https://github.com/SnaBe/node-steam-market-fetcher/blob/master/test/test.js) file.

Using [npm](https://docs.npmjs.com/cli/v8/commands/npm-run-script):
```bash
$ npm test
```

Using [yarn](https://classic.yarnpkg.com/lang/en/docs/cli/run/):
```bash
$ yarn test
```

## Examples

### Importing with `CommonJS`

```js
const SteamMarketFetcher = require('steam-market-fetcher');
```

### or with `ES6's import` statement.

```js
import SteamMarketFetcher from 'steam-market-fetcher';
```

### Instantiating with the `currency` and `format` options.
```js
const Fetcher = new SteamMarketFetcher({
    currency: 'EUR',
    format: 'json'
});
```

### Asynchronous requests with `callbacks`.

```js
Fetcher.getItemPrice({
    market_hash_name: 'AK-47 | Redline (Field-Tested)',
    appid: 730,
    callback: (err, price) => {
        if (err) throw err;

        console.log(price);
    }
});
```

### Asynchronous requests with `async`/`await`.

```js
(async () => {
    try {
        const image = await Fetcher.getItemImage({
            market_hash_name: 'Mann Co. Supply Crate Key',
            appid: 440
        });

        console.log(image);
    } catch (error) {
        console.error('An error occurred: ', error);
    }
})();
```

There are some more examples available in the [test](https://github.com/SnaBe/node-steam-market-fetcher/tree/master/test) directory.

## Documentation

[Version 1.6.0](https://github.com/SnaBe/node-steam-market-fetcher/releases/tag/v1.6.0) includes breaking changes, please see the newly updated [Wiki pages](https://github.com/SnaBe/node-steam-market-fetcher/wiki) for further documentation.

## License

[MIT](LICENSE)

Copyright 2022, Simon Sørensen
