var https = require('https');

function httpsRequest(options, callback) {
    options.headers = options.headers || {};

    var data = options.data ? JSON.stringify(options.data) : null;
    
    if (data) {
        options.headers['Content-Length'] = data.length;
    }

    var req = https.request(options);

    req.on('response', function (res) {
        var response = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            response += chunk;
        });

        res.on('end', function () {
            return callback(null, {
                statusCode: res.statusCode,
                body:       response
            });
        });
    });

    req.on('error', callback);

    if (data) {
        req.write(data);
    }

    req.end();
}

var Bitpay = function (apiKey) {
    if (!apiKey) throw new Error('ApiKey must be provided');
    
    this.apiKey = apiKey;
};

Bitpay.prototype.callApi = function (method, path, data, callback) {
    if (!callback) {
        callback = data;
        data = null;
    }
    
    var options = {
        hostname:   'bitpay.com',
        method:     method,
        path:       path,
        data:       data,
        auth:       this.apiKey + ':'
    };

    httpsRequest(options, function (err, response) {
        if (err) { return callback(err); }

        var body = response.body;
        var statusCode = response.statusCode;

        try {
            body = JSON.parse(body);
        } catch (e) {
            return callback(new Error('Invalid JSON Response Received'), body);
        }

        if (statusCode < 200 || statusCode >= 300) {
            return callback(new Error('Response status code: ' + statusCode), body);
        }

        if (body.error) {
            return callback(new Error('Api returns error: ' + JSON.stringify(body.error)), body);
        } else {
            return callback(null, body);
        }
    });
};

Bitpay.prototype.createInvoice = function (payload, callback) {
    this.callApi('POST', '/api/invoice', payload, callback);
};

Bitpay.prototype.getInvoiceStatus = function (invoiceId, callback) {
    this.callApi('GET', '/api/invoice/' + invoiceId, callback);
};

Bitpay.prototype.getRates = function (callback) {
    this.callApi('GET', '/api/rates', callback);
};

module.exports = Bitpay;