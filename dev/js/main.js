    var socimar = socimar || {};
	
	//ls == localStorage
	socimar.ls = function(name){
		console.log("fake save of " + name + "to ls");
	}

	socimar.canvasSetup = function(){
		var canvas       = document.getElementById("canvas"),
    		canvasHeight = 378,
   			canvasWidth  = 755;
   		console.log("set up canvas!");
	}

	socimar.init = function(string){
		console.log("I was " + string + "ed");
		socimar.canvasSetup();
	}


	socimar.init("init");
