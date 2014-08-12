    var socimar = socimar || {};
    
   	var smallFont = 15,
		mediumFont = 25,
		largeFont = 40,
		apiKey = "AIzaSyAc58SdLylOkN8C81rQKq4LN07V640b4AU";

	//ls == localStorage namespace
	socimar.ls = {
		set:function(key, data){
			store.set("user." + key, data)
			console.log("Set the " + key + " as " + data + " in ls");
		},
		setBatch:function(data){
			store.set("user", data)
			console.log("Set the batch save as " + data + " in ls");
		},
		get:function(key){
			var data = store.get("user." + key)
			console.log("Got the data: " + "%c" + data, "color:green;");
			return data;
		},
		getAll:function(){
			var data = store.get("user")
			console.log(data);
			return data;
		}
	}
	socimar.tint = function(){
		var color = document.getElementById("js-output").value;
		socimar.ctx.fillStyle = color;
		socimar.ctx.fillRect(0,0,socimar.canvas.width,socimar.canvas.height)
	}

	socimar.canvasSetup = function(){
				socimar.canvas 				= document.getElementById("canvas");
    		socimar.canvas.width  = 700,
   			socimar.canvas.height = 450;
   			socimar.ctx 	= canvas.getContext("2d");
	}

	socimar.init = function(string){
		socimar.canvasSetup();
		socimar.tint("rgba(200,0,200,0.53)");
	}


	socimar.init();

	//testing
	var testObj = {
		"rangeInput2": 30,
		"colors": [{"color": "#f4f4f4"},{"color": "#222"},{"color": "#898989"} ],
		"pictures":{
			"picture1": "http://img.img/img",
			"picture2": "http://img.img/img1",
		},
	}

	socimar.ls.set("rangeInput", 25);
	socimar.ls.get("rangeInput")

	socimar.ls.setBatch(testObj);
	socimar.ls.getAll();
