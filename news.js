//var fs = require('fs');

var FileManager = require	('./filemanager.js'	);
var DataManager = require	('./datamanager.js'	);
var HttpClient  = require	('./client.js'			);


var FM = new FileManager	('./store'			);
var DM = new DataManager	(						);
var CL = new HttpClient		('focus-news.net'	);



//------------------------------------------------------------------------//



var request = '/?id=c114';

CL.get(request, function (dom){
	DM.put(request, dom);
	var counter = 1;
	//console.log(dom);
	find(dom);
	
	//Trying to find some usefull information in dom object
	function find(dom){
		
		for (var i in dom){
			var el = dom[i];
			if (el.type === "tag"){
				if(el.name === "a" ){
					if(el.attribs.class === "lastByTypeInnera" || el.attribs.class === "lastByTypeInnera reda"){
						//console.log('('+counter+')\t['+el.attribs.href+']\t['+el.children.data+']');
						console.log(el);
						console.log();
						counter++;
					}
				}
				
			
				find(dom[i].children);
			}
			
		}
	}
	
});

//FM.write('./store', data2.html, DM.container[0);






