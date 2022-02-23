# XecAddr.js: eCash (XEC) general purpose address translation for Node.js and web browsers.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![NPM](https://nodei.co/npm/xecaddrjs.png?downloads=true)](https://nodei.co/npm/xecaddrjs/)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Plug & Play JavaScript library for all eCash (XEC) address format translation needs. Easy-to-use, thoroughly tested, and feature complete.

Support for the eCash (XEC) address format, based on the original [cashaddress format](https://github.com/Bitcoin-UAHF/spec/blob/master/bchaddr.md), which improves upon [BIP 173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki), as well as the Bitpay and Legacy formats.

## Installation

### Using NPM or Yarn

```bsh
$ npm install xecaddrjs
$ yarn add xecaddrjs
```

### Manually

You may also download the distribution file manually and place it within your third-party scripts directory: [dist/xecaddrjs-0.0.1.min.js](https://unpkg.com/xecaddrjs@0.0.1/dist/xecaddrjs-0.0.1.min.js).

## Usage

### In Node.js

```javascript
// Common-JS
const xecaddr = require('xecaddrjs');

// ES6 modules
import xecaddr from 'xecaddrjs';
```

### Browser

#### Script Tag

You may include a script tag in your HTML and the `xecaddr` module will be defined globally on subsequent scripts.

```html
<html>
  <head>
    ...
    <script src="https://unpkg.com/xecaddrjs@0.0.1/dist/xecaddrjs-0.0.1.min.js"></script>
  </head>
  ...
</html>
```

## Code Examples

### Supported formats, networks and address types.
```javascript
var Format = xecaddr.Format; // Legacy, Bitpay, Xecaddr (XEC), or Cashaddr (BCH).
var Network = xecaddr.Network; // Mainnet or Testnet.
var Type = xecaddr.Type; // P2PKH or P2SH.
```

### Test if a string is a valid eCash (XEC) address of any type, in any format.
```javascript
var isValidAddress = xecaddr.isValidAddress;

isValidAddress(null) // false
isValidAddress('') // false
isValidAddress('some invalid address') // false
isValidAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq') // false
isValidAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // true
isValidAddress('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // true
isValidAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // true
isValidAddress('ecash:qph5kuz78czq00e3t85ugpgd7xmer5kr7cdywekmgp') // true
isValidAddress('bitcoincash:qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // true
```

**Note: You can use this function to check if any input is a valid eCash (XEC) address.<br>Other functions in this library will throw an `InvalidAddressError` on invalid inputs.**

### Test for address format.
```javascript
var isLegacyAddress = xecaddr.isLegacyAddress;
var isBitpayAddress = xecaddr.isBitpayAddress;
var isXecAddress = xecaddr.isXecAddress;
var isCashAddress = xecaddr.isCashAddress;

isLegacyAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // true
isLegacyAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // false
isBitpayAddress('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // true
isBitpayAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // false
isXecAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7cdywekmgp') // true
isXecAddress('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // false
isCashAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // true
isCashAddress('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // false
```

### Test for address network.
```javascript
var isMainnetAddress = xecaddr.isMainnetAddress;
var isTestnetAddress = xecaddr.isTestnetAddress;

isMainnetAddress('1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke') // true
isMainnetAddress('mnbGP2FeRsbgdQCzDT35zPWDcYSKm4wrcg') // false
isTestnetAddress('qqdcsl6c879esyxyacmz7g6vtzwjjwtznsggspc457') // true
isTestnetAddress('CeUvhjLnSgcxyedaUafcyo4Cw9ZPwGq9JJ') // false
```

### Test for address type.
```javascript
var isP2PKHAddress = xecaddr.isP2PKHAddress;
var isP2SHAddress = xecaddr.isP2SHAddress;

isP2PKHAddress('1Mdob5JY1yuwoj6y76Vf3AQpoqUH5Aft8z') // true
isP2PKHAddress('2NFGG7yRBizUANU48b4dASrnNftqsNwzSM1') // false
isP2SHAddress('H92i9XpREZiBscxGu6Vx3M8jNGBKqscBBB') // true
isP2SHAddress('CeUvhjLnSgcxyedaUafcyo4Cw9ZPwGq9JJ') // false
```

### Detect address format.
```javascript
var detectAddressFormat = xecaddr.detectAddressFormat;

detectAddressFormat('ecash:qph5kuz78czq00e3t85ugpgd7xmer5kr7cdywekmgp') // Format.Xecaddr
detectAddressFormat('qqdcsl6c879esyxyacmz7g6vtzwjjwtznsggspc457') // Format.Cashaddr
detectAddressFormat('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // Format.Bitpay
```

### Detect address network.
```javascript
var detectAddressNetwork = xecaddr.detectAddressNetwork;

detectAddressNetwork('1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke') // Network.Mainnet
detectAddressNetwork('qqdcsl6c879esyxyacmz7g6vtzwjjwtznsggspc457') // Network.Testnet
```

### Detect address type.
```javascript
var detectAddressType = xecaddr.detectAddressType;

detectAddressType('1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke') // Type.P2PKH
detectAddressType('3NKpWcnyZtEKttoQECAFTnmkxMkzgbT4WX') // Type.P2SH
```

### Translate address from any address format into a specific format.
```javascript
var toXecAddress = xecaddr.toXecAddress;
var toLegacyAddress = xecaddr.toLegacyAddress;
var toBitpayAddress = xecaddr.toBitpayAddress;
var toCashAddress = xecaddr.toCashAddress;

toLegacyAddress('ecash:qph5kuz78czq00e3t85ugpgd7xmer5kr7cdywekmgp') // 1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR
toBitpayAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj
toXecAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // ecash:qph5kuz78czq00e3t85ugpgd7xmer5kr7cdywekmgp
```

## Documentation

### Generate and Browse Locally

```bsh
$ yarn run docs
```
