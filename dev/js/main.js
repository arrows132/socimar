	var socimar = socimar || {};


	//ls == localStorage namespace
	socimar.ls = {
		set:function(key, data){
			store.set(key, data);
			console.log("Set the " + key + " as " + data + " in ls");
		},
		get:function(key){
			var data = store.get(key);
			//console.log("Got the data: " + "%c" + data, "color:green;");
			return data;
		},
		getAll:function(){
			var data = store.getAll();
			console.log(data);
			return data;
		},
		clear:function(){
			store.clear()
			console.log("%c" + "Clearing Data", "color:red;");
		}

	}

	socimar.settings = {
		fontSize:function(){
			var savedFontSize = socimar.ls.get("fontSize");
			if(savedFontSize == undefined){
				var fontSize = 40; 
				return fontSize;
				socimar.draw();
			}else{
				var fontSize = savedFontSize; 
				return fontSize;
				socimar.draw();
			};
		},
		fontSetter:function(number){
			socimar.ls.set("fontSize", number);
			return socimar.settings.fontSize();
			socimar.draw();
		},

		textAlign: function(){
			var textAlignSaved = socimar.ls.get("textAlign");
			if(textAlignSaved == undefined){
				var textAlign = "left"; 
				return textAlign;
				socimar.draw();
			}else{
				var textAlign = textAlignSaved; 
				return textAlign;
				socimar.draw();
			};
		},
		textAlignSetter:function(side){
			socimar.ls.set("textAlign", side);
			return socimar.settings.textAlignSetter();
			socimar.draw();
		},
		wordBreak: "normal",
		lineHeight: 0,
		margin: [10,10,10],
		textColor:"rgba(255, 255, 255, 1)",
		fileName:function(){
			var fileNameSaved = socimar.ls.get("fileName");
			var incrementSaved = socimar.ls.get("increment");
			if(incrementSaved == undefined){increment = 0}else{increment = incrementSaved};
			if(fileNameSaved == undefined){
				var fileName = "socimar.jpg";
				return fileName;
			}else{
				var fileName = fileNameSaved + "-" + increment + ".jpg";
				return fileName;
			};
		}
	};
	socimar.settings.lineHeight = socimar.settings.fontSize()*1.20;

	socimar.canvasSetup = function(){
		socimar.canvas = document.getElementById("canvas");
		socimar.canvas.width  = 700,
		socimar.canvas.height = 394;
		socimar.ctx = canvas.getContext("2d");
	}

	socimar.canvasResize = function(){
		var newWidth,
			newHeight;
		if(socimar.img.width > 700){
			newWidth = 700;
		} else {
			newWidth = socimar.img.width;
		}

		newHeight = (socimar.img.height / socimar.img.width) * newWidth;
		socimar.canvas.width  = newWidth,
		socimar.canvas.height = newHeight;

	}

	socimar.loadImage = function(dndImg){
		console.log("loading image...");
		var file = dndImg[0],
				img = new Image(),
				url = window.URL || window.webkitURL,
				src = url.createObjectURL(file);

		img.src = src;
		img.onload = function() {
			console.log("Image loaded!");
			socimar.img = img;
			socimar.canvasResize();
			socimar.draw();
		}
	}

	socimar.changeColor = function(draw) {
		socimar.color = document.getElementById("js-output").value;
		if (draw == true) {
			socimar.draw();
		}
	}

	socimar.changeFontSize = function() {
		var fontSize = document.getElementById("font-size").value;
		socimar.settings.fontSetter(fontSize);
		socimar.draw();
	}

	socimar.draw = function() {
		//console.log("Drawing");
		if(socimar.img == undefined){
			socimar.ctx.fillStyle = "rgb(2, 176, 202)";
			socimar.ctx.fillRect(0,0,socimar.canvas.width,socimar.canvas.height);
			socimar.ctx.textAlign = 'center';
			socimar.ctx.font = socimar.settings.fontSize() + "px Open Sans";
			socimar.ctx.fillStyle = "rgba(255, 255, 255, 1)";
			socimar.ctx.fillText("upload image \r to begin.", canvas.width / 2, 80);
			return 0;
		}
		socimar.clearCanvas();
		socimar.drawImage();
		socimar.tint();
		socimar.drawText();
		socimar.font();
	}
	
	socimar.clearCanvas = function(){
		socimar.ctx.clearRect( 0, 0, canvas.width, canvas.height );
	}

	socimar.drawImage = function() {
		socimar.ctx.drawImage(socimar.img, 0, 0, socimar.canvas.width, socimar.canvas.height);
	}

	socimar.tint = function(){
		socimar.ctx.fillStyle = socimar.color;
		socimar.ctx.fillRect(0,0,socimar.canvas.width,socimar.canvas.height);
	}

	socimar.drawText = function(){
		socimar.ctx.font = socimar.settings.fontSize() + "px " + socimar.font.current;
		socimar.ctx.fillStyle = socimar.settings.textColor;
		var margins = socimar.settings.margin,
		lineHeight = socimar.settings.lineHeight,
		maxWidth = socimar.canvas.width-(margins[1]+margins[2]),
		text = document.getElementById("mainText").value,
		textWidth = socimar.ctx.measureText(text).width,
		lines = [],
		line = margins[0]+lineHeight,
		words,
		lastSlice,
		splitter;

		if(textWidth < maxWidth){
			console.log(text);
			socimar.ctx.fillText(text, margins[1], line);
		} else {
			if(socimar.settings.wordBreak == "normal"){
				splitter = " ";
			}
			words = text.split(splitter);
			lastSlice = 0;
			for(i in words){
				if(socimar.ctx.measureText(words.slice(lastSlice, parseInt(i)+1).join(splitter)).width > maxWidth){
					lines.push(words.slice(lastSlice, i).join(splitter));
					lastSlice = i;
				}
				if(parseInt(i)+1 == words.length) {
					lines.push(words.slice(lastSlice).join(splitter));
				}
			}
			console.log(lines);
			for(e in lines){
				socimar.ctx.fillText(lines[e], margins[1], line);
				line = line + lineHeight;
			}
		}
	}

	socimar.saveImage = function(){
		console.log("saving image");
		var image  = socimar.canvas.toDataURL().replace( 'image/png', 'image/octet-stream' );
		download.href = image;
	}

	socimar.handleDragAndDrop = function(e){
		e.stopPropagation();
		e.preventDefault(); 
		event.dataTransfer.dropEffect = 'copy';
		$(".main-image").addClass("dragging");;
	} 
 
  	socimar.handleFiles = function(e) {
		e.stopPropagation();
		e.preventDefault(); 
    	socimar.loadImage( e.dataTransfer.files );
  	}

	socimar.font = function(){
		var defaultFont = "Open Sans";
		var lsFont = socimar.ls.get("font");
		if(font == undefined && lsFont == undefined){
			var familyPlus = defaultFont.replace(/\s/g, '+');
			var familyCSS = "http://fonts.googleapis.com/css?family=" + familyPlus + "";
			$("head").append("<link href='"+ familyCSS +"' rel='stylesheet' type='text/css' class='gf-link'>");   
			socimar.ls.set("font", defaultFont);
			$("#font").attr("placeholder", defaultFont);
			$(".font").css("font-family", defaultFont);
			var returnText = defaultFont;
		}else{
			$("#font").attr("placeholder", lsFont);
			var familyPlus = lsFont.replace(/\s/g, '+');
			var familyCSS = "http://fonts.googleapis.com/css?family=" + familyPlus + "";   
			$("head").append("<link href='"+ familyCSS +"' rel='stylesheet' type='text/css' class='gf-link'>");
			$(".font").css("font-family", lsFont);
			var returnText = lsFont;
		}
		socimar.font.current = returnText;

	}

	socimar.font.change = function(font){
		var familyPlus = font.replace(/\s/g, '+');
		var familyCSS = "http://fonts.googleapis.com/css?family=" + familyPlus + "";   
		$("head").append("<link href='"+ familyCSS +"' rel='stylesheet' type='text/css' class='gf-link'>");
		socimar.ls.set("font", font);
		$("#font").attr("placeholder", font);
		$(".font").css("font-family", font);
		setTimeout(function(){
			socimar.draw();
			console.log("font Change!!");
			$(".canvas-holder").removeClass("visible");
		},2000)
		socimar.font.current = font;
	}

	socimar.clearAll = function(){
		socimar.ls.clear();
		socimar.draw();
	}

	socimar.events = function(){
		var download     = document.getElementById('download');
		download.addEventListener( 'click', socimar.saveImage, false );
		var dragndrop = document.getElementById( 'draganddrop' );
    	dragndrop.addEventListener( 'dragover', socimar.handleDragAndDrop, false );
    	dragndrop.addEventListener( 'drop', socimar.handleFiles, false );
    	var dndcanvas = document.getElementById( 'canvas' );
    	dndcanvas.addEventListener( 'dragover', socimar.handleDragAndDrop, false );
    	dndcanvas.addEventListener( 'drop', socimar.handleFiles, false );
    	var clearSettings = document.getElementById("btn-clear");
    	clearSettings.addEventListener('click', socimar.clearAll, false);
	}

	socimar.init = function(){
		socimar.canvasSetup();
		socimar.changeColor();
		socimar.events();
		socimar.draw();
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
			$(".canvas-holder").addClass("visible");
			var loaderWidth = $("canvas").width();
	  		$(".overlay").css("height", loaderWidth);
			socimar.draw();
		}
	});

	function runFont(family) {
	  $.getJSON(url,function(json){
		$.each(json.items,function(i,type){
		  if (type.family === family) {
			socimar.font.change(family);
			socimar.draw();
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
			socimar.draw();
		  }
		});
	  });
	  
	}

	$(".random").click(function(){
	  random();
	  $(".canvas-holder").addClass("visible");
	  var loaderWidth = $("canvas").width() + 6;
	  $(".overlay").css("width", loaderWidth);
	});
