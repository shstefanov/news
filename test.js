
function DataManager() { //(container[], put(a) )
			this.container = new Array(); 
			

			this.put = function (request,something){
						this.container.push(something);
						
						}
						
			}

function Client (hostname) {

	var http = require("http");
	var host = hostname;
	var request;
	var data;
	
	var instance = http.createClient(80, host);
	
	
	
	this.get = function (req) {
		request = instance.request( 'GET', req, {'host':host} ); //req - the request
  												
											
		request.end();	
		request.on('response', function (response) {
							response.on('data', function (chunk) 	{	data += chunk; 	});
							response.on('end', function ()				{ 	DM.put(req, data); console.log(data.length);}); 
																
																		}
						);
								}
	
	
	


}
			
function FileManager () {
					this.list = new Array();
					this.fs = require("fs");
					this.a = new Array();
					this.fs.readdir('.', function(err,files)
							{	
								this.a = files;
								console.log(this.a);}
									);
					
					
				
			}

function DatabaseManager () {
			
			}

function EventBus () {
			
			}
			
var c = new Client("focus-news.net");

var DM = new DataManager();

//c.get("/?id=c134");
//console.log(DM.container.length); //can't see container, because it is asynchronous and comes after some time

var FM = new FileManager ();
setTimeout(function() { console.log(a, 4000);});
//for (var i = 0 ; i < FM.a.length ; i++){console.log(FM.a);}
