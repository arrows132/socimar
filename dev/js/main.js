	var socimar = socimar || {};
	
	var smallFont = 15,
		mediumFont = 25,
		largeFont = 40;

	//ls == localStorage namespace
	socimar.ls = {
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
		}
		else{
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

	//the init for canvas
	socimar.draw = function() {
		if(socimar.img == undefined){
			socimar.ctx.fillStyle = "rgb(2, 176, 202)";
			socimar.ctx.fillRect(0,0,socimar.canvas.width,socimar.canvas.height);
			socimar.ctx.textAlign = 'center';
			socimar.ctx.font = largeFont + "px Open Sans";
			socimar.ctx.fillStyle = "rgba(255, 255, 255, 1)";
			socimar.ctx.fillText("upload image \r to begin.", canvas.width / 2, 80);
			socimar.drawText.setLineheight();
			return 0;
		}
		socimar.clearCanvas();
		socimar.drawImage();
		socimar.tint();
		socimar.drawText();
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
		socimar.ctx.font = largeFont + "px " + socimar.font.current;
		socimar.ctx.fillStyle = "rgba(255, 255, 255, 1)";
		$(socimar.lines).each(function(key, data){
			console.log("drawing");
			socimar.ctx.fillText(data, 0,(socimar.lineHeight*(key+1)));
		});

	}

	socimar.drawText.setLineheight = function(){
		var fontSize = parseInt(socimar.ctx.font.split("px")[0]);
		socimar.lineHeight = fontSize*1.20;
	}

	socimar.drawText.parseText = function(){
		var text = document.getElementById("mainText").value
		textWidth = socimar.ctx.measureText(text).width,
		maxWidth = socimar.canvas.width*.90;
		socimar.text = text;
		if(textWidth > maxWidth){
			socimar.drawText.formatText("word");
		} else {
			socimar.lines = [text,"fdslkjfalsdfjklasjkdf","fsdalfdsajklkjdsl"];
		}
		socimar.draw();
	}

	socimar.drawText.formatText = function(type){
		if(type == "word"){
			var words = socimar.text.split(" ");
			console.log(words);
			if(words.length == 1) {
				socimar.drawText.formatText("break-word");
				return 0;
			}

		}

		if(type == "break-word"){

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

	socimar.font = function(font){
		var defaultFont = "Open Sans";
		var lsFont = socimar.ls.get("font");
		var familyCSS = "http://fonts.googleapis.com/css?family=" + lsFont + "";   
		if(font == undefined && lsFont == undefined){
			socimar.ls.set("font", defaultFont);
			$("#font").attr("placeholder", defaultFont);
			$(".font").css("font-family", defaultFont);
			var returnText = defaultFont;
		}else if(font !== undefined){
			socimar.ls.set("font", font);
			$("#font").attr("placeholder", font);
			$(".font").css("font-family", font);
			var returnText = font;
		}else{
			$("#font").attr("placeholder", lsFont);
			$("head").append("<link href='"+ familyCSS +"' rel='stylesheet' type='text/css' class='gf-link'>");
			$(".font").css("font-family", lsFont);
			var returnText = lsFont;	
		}
		socimar.font.current = returnText;
		socimar.draw();
		console.log(familyCSS);

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
	}

	socimar.init = function(){
		socimar.canvasSetup();
		socimar.changeColor();
		socimar.events();
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
			socimar.draw();
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
			socimar.draw();
			$(".font").css("font-family", family);
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
			socimar.draw();
		  }
		});
	  });
	  
	}

	$(".random").click(function(){
	  random();
	});