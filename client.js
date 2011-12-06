var Iconv = require('iconv').Iconv;
var iconv = new Iconv('cp1251','utf8');
var DataManager = require('./datamanager.js');
var DM = new DataManager('./store');

function Client(hostname) {
    var http = require("http");
    var host = hostname;
    var request;
    var data; // = new Buffer(0);
    var instance = http.createClient(80, host);
    this.get = function (req, callback) {
        request = instance.request('GET', req, {
            'host': host
        }); //req - the request
        request.end();
        request.on('response', function (response) {
        		
            response.on('data', function (chunk) {
               	
				data+=iconv.convert(chunk);
            });
            response.on('end', function () {
				
				
                DM.put(req, data);
				
				callback(data);
             });
        });
    }
}

module.exports = Client;
