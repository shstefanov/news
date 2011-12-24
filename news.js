//var fs = require('fs');

var FileManager = require	('./filemanager.js'	);
var DataManager = require	('./datamanager.js'	);
var HttpClient  = require	('./client.js'			);
var Harvester 	 = require	('./harvester.js'		);

var HV = new Harvester		(						);
var FM = new FileManager	('./store'			);
var DM = new DataManager	(						);
var CL = new HttpClient		('focus-news.net'	);



//------------------------------------------------------------------------//



var request = '/?id=c134';

CL.get(request, function (dom){
	//DM.put(request, dom);
	
	
	HV.dom_selector(dom, function(el){ 
		if (
			el.attribs && 
			el.attribs.class && 
				(
				el.attribs.class === "lastByTypeInnera" || 
				el.attribs.class === "lastByTypeInnera reda"
				)
		) {
			DM.put (
				FM.get, 
				{	id:el.attribs.href, 
					title:el.children[0].raw.slice(12,el.children[0].raw.length - 12)
				}
			);
			
		}//End if				
		
		if (
			el.name === "div" && 
			el.attribs && 
			el.attribs.class && 
			el.attribs.class === "date3"
		) {
			
			DM.container[DM.container.length - 1].moment = {
				day: 		el.children[0].raw.split('|')[0].split(' ')[0],
				month: 	el.children[0].raw.split('|')[0].split(' ')[1],
				year: 	el.children[0].raw.split('|')[0].split(' ')[2],
				hour: 	el.children[0].raw.split('|')[1].split(' ')[1].split(':')[0],
				minute:	el.children[0].raw.split('|')[1].split(' ')[1].split(':')[1],
			}
			
		}//End if
	});//End HV.dom_selector() callback
	DM.container.forEach(function(c){
		CL.get(c.id, function(dom){
			HV.dom_selector(dom, function(el){
				if (
					el.name === "div" && 
					el.attribs && 
					el.attribs.class && 
					el.attribs.class === "text"
				) {
					var text = "";
					var len = el.children.length;
					for(var i = 0;i<len;i++){
						
						if (el.children[i].type === "tag" &&el.children[i].name === "b"){
							if (el.children[i].children[0].name === "i") 	text += el.children[i].children[0].children[0].raw;
							if(!el.children[i].children[0].children) 			text +=el.children[i].children[0].raw;
						}
						if (el.children[i].type === "text") text += el.children[i].raw;
					}
						c.text = text.split("\r").join("").split("\n").join("").split("  ").join("").split("\t").join("");
				}
			});//End HV.dom_selector(dom, function(el)
		console.log('['+c.id+']-['+c.moment.day+','+c.moment.month+','+c.moment.year+' '+c.moment.hour+':'+c.moment.minute+']');
		console.log('['+c.title+']');
		console.log('['+c.text+']');
		console.log();
		});//End CL.get(c.request, function(dom)
		
	});//End DM.container.forEach(function(c)
	
});//End of CL.get(request, function (dom)







