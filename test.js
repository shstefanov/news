//var fs = require('fs');

var FM = require('./filemanager.js');
var DM = require('./datamanager.js');
var CL = require('./client.js');
var PR = require('htmlparser');

var cl = new CL('focus-news.net');




function DatabaseManager() {

}

function EventBus() {

}



//------------------------------------------------------------------------//



var html_parsed;

cl.get('/?id=nt&where=1&zone=-1', function (data){
	FM.write('./store', 'data2.html', data);
	
	var handler = new PR.DefaultHandler(function (error, dom) {
    	if (error)
       		console.log(error);
   		else
        	console.log(dom[3].children[25].children[1].children[5]);
	});
	var parser = new PR.Parser(handler);
	parser.parseComplete(data);
});





