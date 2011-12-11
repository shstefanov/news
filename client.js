var Iconv = require('iconv').Iconv;
var PR = require('htmlparser');



function Client(hostname) {

	var http = require("http");
	var iconv = new Iconv('cp1251','utf8');
    
	var host = hostname;
	var request;
	var data;
	var instance = http.createClient(80, host);
	
	this.get = function (req, callback) {
		request = instance.request('GET',req,{'host': host}); //req - the request
		request.end();
		request.on('response', function (response) {	
			response.on('data', function (chunk) {
				data+=iconv.convert(chunk);
			});
			response.on('end', function () {
				var handler = new PR.DefaultHandler(function (error, dom) {
					if (error)
						console.log(error);
					else
						//console.log(dom);
						callback(dom);
        				
				});
				var parser = new PR.Parser(handler);
				parser.parseComplete(data);
				
			});
		});
	}
}

module.exports = Client;
