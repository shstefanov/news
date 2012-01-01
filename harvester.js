function Harvester(){
	var self = this;
	
	function piece(){
	
		function time_date(){
			this.year = 0;
			this.month = 0;
			this.day = 0;
			
			this.weekday = 0;
						
			this.hour = 0;
			this.minute = 0;
			this.secunde = 0;
		}
		this.href = "";
		this.title = "";
		this.moment = new time_date();
		this.text = ""
	}
	
	
	
		this.explorer = function (dom, callback){
			
			//console.log(list);
			for (var i in dom){
				var el = dom[i];
				callback(el);
				self.explorer(el.children, callback); //Racursive call of inner function

			
			}//End of for statement
		}//End this.explorer() function

	
	
	
}//End Harvester() function

module.exports = Harvester;
