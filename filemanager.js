var fs = require('fs');

function FileManager(dir) {
	this.home = dir; //Setting the home variable
	this.list = dir_map(dir); //Initialize the map of the directory
	
	function dir_map(path) { //Recursive function
	
		var dirlist =  fs.readdirSync(path);
		
		
		for (var idx in dirlist) {
			
			var name = dirlist[idx];
			p = path + '/' + dirlist[idx];
			d = dirlist[idx];
			if (fs.statSync(p).isDirectory()){
				
				
				dirlist[idx] = dir_map(p);
				dirlist[idx].type = 'directory';
				dirlist[idx].name = name;
			}
			else {
				
				dirlist[idx].type = 'file';
				dirlist[idx].name = name;
			}
		}
		
		return dirlist;
	}
		
	this.write = function (path, filename, data){
		var f = fs.createWriteStream(path + '/' + filename);
		f.write(data);
	}
	//!!!---!!! TO DO !!!---!!!
	this.read = function (path, filename){
		return fs.readFileSync(path+'/'+filename).toString();
	}
	
}
module.exports = FileManager;
