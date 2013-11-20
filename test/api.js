var nock = require('nock')
    , assert = require('assert')
    , Bitpay = require('..');

describe('callApi', function () {

    it('should GET the api method', function (done) {
        var mockResponse = { jjx: 'jjx' };

        var mockHttp = nock('https://bitpay.com')
            .get('/get-example')
            .reply(400, mockResponse);

        var api = new Bitpay('mock-api-key');

        api.callApi('GET', '/get-example', function (err, res) {
            mockHttp.done();
            done();
        });
    });

    it('should POST with correct header', function (done) {
        var mockResponse = { jjx: 'jjx' };

        var mockHttp = nock('https://bitpay.com')
            .post('/post-example', { data: 'mock' })
            .reply(400, mockResponse);

        var api = new Bitpay('mock-api-key');

        api.callApi('POST', '/post-example', { data: 'mock' }, function (err, res) {
            mockHttp.done();
            done();
        });
    });

    it('should return error when status is not 200', function(done) {
        var mockResponse = { jjx: 'jjx' };

        var mockHttp = nock('https://bitpay.com')
            .post('/not-200', {})
            .reply(400, mockResponse);

        var api = new Bitpay('mock-api-key');

        api.callApi('POST', '/not-200', {}, function (err, res) {
            assert(err);
            assert.deepEqual(res, mockResponse);

            mockHttp.done();
            done();
        });
    });

    it('should return error when body has "error" field', function(done) {
        var mockHttp = nock('https://bitpay.com')
            .post('/failure-response', {})
            .reply(200, { error: 'error' });

        var api = new Bitpay('mock-api-key');

        api.callApi('POST', '/failure-response', {}, function (err, res) {
            assert(err);
            assert.deepEqual(res, { error: 'error' });

            mockHttp.done();
            done();
        });
    });

    it('should return OK when body has not error', function(done) {
        var mockHttp = nock('https://bitpay.com')
            .post('/ok-response', {})
            .reply(200, { mock: 'response' });

        var api = new Bitpay('mock-api-key');

        api.callApi('POST', '/ok-response', {}, function (err, res) {
            assert(!err);
            assert.deepEqual(res, { mock: 'response' });

            mockHttp.done();
            done();
        });
    });
});

describe('createInvoice', function () {

    it('should POST to /api/invoice with the invoice payload', function (done) {
        var mockResponse = { jjx: 'jjx' };

        var mockHttp = nock('https://bitpay.com')
            .post('/api/invoice', { mock: 'payload' })
            .reply(200, mockResponse);

        var api = new Bitpay('mock-api-key');

        api.createInvoice({ mock: 'payload' }, function (err, res) {
            assert(!err);
            assert.deepEqual(res, mockResponse);

            mockHttp.done();
            done();
        });
    });
});

describe('getInvoiceStatus', function () {

    it('should GET /api/invoice/ with the invoice id', function (done) {
        var mockResponse = { jjx: 'jjx' };

        var mockHttp = nock('https://bitpay.com')
            .get('/api/invoice/mock-invoice-id')
            .reply(200, mockResponse);

        var api = new Bitpay('mock-api-key');

        api.getInvoiceStatus('mock-invoice-id', function (err, res) {
            assert(!err);
            assert.deepEqual(res, mockResponse);

            mockHttp.done();
            done();
        });
    });
});

describe('getRates', function () {

    it('should GET to /api/rates', function (done) {
        var mockResponse = { jjx: 'jjx' };

        var mockHttp = nock('https://bitpay.com')
            .get('/api/rates')
            .reply(200, mockResponse);

        var api = new Bitpay('mock-api-key');

        api.getRates(function (err, res) {
            assert(!err);
            assert.deepEqual(res, mockResponse);

            mockHttp.done();
            done();
        });
    });
});