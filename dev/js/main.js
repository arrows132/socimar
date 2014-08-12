    var socimar = socimar || {};
    
   	var smallFont = 15,
		mediumFont = 25,
		largeFont = 40;

	//ls == localStorage namespace
	socimar.ls = {
		"user": {},
		set:function(key, data){
			store.set(key, data);
			console.log("Set the " + key + " as " + data + " in ls");
		},
		get:function(key){
			var data = store.get(key);
			console.log("Got the data: " + "%c" + data, "color:green;");
			return data;
		},
		getAll:function(){
			var data = store.getAll();
			console.log(data);
			return data;
		},
		clear:function(){
			store.clear()
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

	socimar.font = function(font){
		//on first run it sets open sans as default font. 
		//However, if you choose another font it saves it for use at a later time.
		var defaultFont = "Open Sans";
		var lsFont = socimar.ls.get("font");
		if(font == undefined && lsFont == undefined){
			socimar.ls.set("font", defaultFont);
			$("#font").attr("placeholder", defaultFont);
			return "font-family: " + defaultFont;
		}else if(font !== undefined){
			socimar.ls.set("font", font);
			$("#font").attr("placeholder", font);
			return "font-family: " + font;
		}else{
			$("#font").attr("placeholder", lsFont);
			return "font-family: " + lsFont;	
		}
	}

	socimar.init = function(string){
		socimar.canvasSetup();
		socimar.tint("rgba(200,0,200,0.53)");
	}


	socimar.init();












	//
	// Ugh, this just looks like grossness.
	//
	var url ="https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAc58SdLylOkN8C81rQKq4LN07V640b4AU";
	var family = "";
	var families = [];
	runFont(family);
	

	$.getJSON(url,function(json){
	  $.each(json.items,function(i,type){
	    families.push(type.family);
	  });
	  socimar.font();
	});


	$('#font').typeahead({
		source: families,
		updater:function (item) {
			runFont(item);
	    	$("#font").attr("placeholder",item);
		}
	});

	function runFont(family) {
	  $.getJSON(url,function(json){
	    $.each(json.items,function(i,type){
	      if (type.family === family) {
	        var familyPlus = family.replace(/\s/g, '+');
	        var familyCSS = "http://fonts.googleapis.com/css?family=" + familyPlus + ":" + type.variants + "";        
	        $(".gf-link").remove();
	        $("head").append("<link href='"+ familyCSS +"' rel='stylesheet' type='text/css' class='gf-link'>");
	        socimar.font(family);
	        if($(".variants").text().match('italic')){
	          $("em").css("font-style","italic");
	        }
	        if($(".variants").text().match('700')){
	          $("strong,h1,h2,h3").css("font-weight","700");
	        }
	 
	      }
	    });
	  });
	}

	function random() {
	  $.getJSON(url,function(json){
	    var count = json.items.length,
	        random = Math.ceil(Math.random() * count);
	    $.each(json.items,function(i,type){
	      if(i === random){
	        var family = type.family;
	        $("#font").attr("placeholder", family);
	        runFont(family);
	      }
	    });
	  });
	  $(".heart").removeClass("active");
	}

	$(".random").click(function(){
	  random();
	});
