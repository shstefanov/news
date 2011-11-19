function Client (hostname) {

	var http = require("http");
	var host = hostname;
	var request;
	var data;
	
	var instance = http.createClient(80, host);
	
	
	
	this.get = function (req) {
		request = instance.request(
										'GET', 
										req, //Here is the GET request (example - "/?id=c134")
  										{'host': host}
												);
		request.end();	
		request.on('response', function (response) {
																response.on('data', function (chunk) 	{	data += chunk; 	});
																response.on('end', function ()				{ 	DM.put(req, data); }); 
																
																		}
						);
								}
	
	
	


}
