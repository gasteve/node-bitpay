## Bitpay API nodejs client

Node.js client for Bitpay API, without dependencies

### Usage
  * Add dependency 'bitpay' in your package.json file.
  * Require 'bitpay' in your file.
  * Call to <a href="#create-invoice">createInvoice</a> to create a new invoice and to <a href="#get-invoice-status">getInvoiceStatus</a> to get info about the invoice. If you get an error, you can check the response too for more details and better error handling.

#### CreateInvoice
```js
var Bitpay = require('bitpay');
var bitpayClient = new Bitpay('YOUR-API-KEY');

var payload = {
    price: 100,
    currency: 'USD'
};

bitpayClient.createInvoice(payload, function (err, response) {
    if (err) {
        // see the error
        console.log(err);
        // check the http response too
        console.log(response);
    } else {
        // javascript object (parsed from JSON response)
        console.log(response);
    }
});
```

#### GetInvoiceStatus
```js
var Bitpay = require('bitpay');
var bitpayClient = new Bitpay('YOUR-API-KEY');

bitpayClient.getInvoiceStatus('abcd1234', function (err, response) {
    if (err) {
        // see the error
        console.log(err);
        // check the http response too
        console.log(response);
    } else {
        // javascript object (parsed from JSON response)
        console.log(response);
    }
});
```

#### GetRates
```js
var Bitpay = require('bitpay');
var bitpayClient = new Bitpay('YOUR-API-KEY');

bitpayClient.getRates(function (err, response) {
    if (err) {
        // see the error
        console.log(err);
        // check the http response too
        console.log(response);
    } else {
        // array with rates from https://bitpay.com/api/rates
        console.log(response);
    }
});
```

### Tests
  Run the tests on parent folder with
```sh
mocha
```

### Reference
<a href="https://bitpay.com/bitcoin-payment-gateway-api" target="_blank">Bitpay documentation</a>
