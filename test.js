var fs = require('fs');


function DataManager() { //(container[], put(a) )
    this.container = new Array();
    this.put = function (request, something) {
        this.container.push(something);
    }
}

function Client(hostname) {
    var http = require("http");
    var host = hostname;
    var request;
    var data;
    var instance = http.createClient(80, host);
    this.get = function (req) {
        request = instance.request('GET', req, {
            'host': host
        }); //req - the request
        request.end();
        request.on('response', function (response) {
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                DM.put(req, data);
                console.log(data.length);
            });
        });
    }
}

var counter = 0;
function FileManager(dir) {
	this.home = dir;
	function dir_map(path) {
	
		var dirlist =  fs.readdirSync(path);
		
		console.log(path);
		for (var idx in dirlist) {
			
			var name = dirlist[idx];
			p = path + '/' + dirlist[idx];
			d = dirlist[idx];
			if (fs.statSync(p).isDirectory()){
				
				console.log(' ---->'+p);dirlist[idx] = dir_map(p);
				dirlist[idx].type = 'directory';
				dirlist[idx].name = name;
			}
			else {
				console.log(p);
				dirlist[idx].type = 'file';
				dirlist[idx].name = name;
			}
		}
		console.log('<----'+path);
		return dirlist;
	}
	
	this.list = dir_map(dir);
}

function DatabaseManager() {

}

function EventBus() {

}

var c = new Client("focus-news.net");

var DM = new DataManager();



FM = new FileManager('./store');
console.log(FM.list);



