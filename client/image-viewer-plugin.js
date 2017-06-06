var isOpen = false;
var rotateAngle = 0;
var currentIndex = 0;
var imagesArray = [];
var zoomFactor = 1.2;
var curScale = 1;
var horizontalCenter = $(window).width()/2;


$(document).ready(function(){
	$("#previewImg").draggable();
	$("#previewImg").panzoom({
		panOnlyWhenZoomed: true,
		minScale: 1
	});



	// Click Listener for Images
	$("body").on('click','img.viewer-img',function(){
		var currImg = $(this).attr('src');
		findImgInArray(currImg).then(function(res){turnOn(res) })
	})


	// Click Listeners for Next, Prev, Rotate and Close
	$("#viewer-img-zoom-in").click(function(){zoomIn()})
	$("#viewer-img-zoom-out").click(function(){zoomOut()})
	$("#viewer-img-nxt").click(function(){next()})
	$("#viewer-img-prev").click(function(){previous()})
	$("#viewer-img-rotate").click(function(){doRotate()})
	$("#viewer-img-close").click(function(){turnOff()})

	$("#viewer-img-reel").on("click",".viewer-img-reel-images",function(){
		showImg($(this).attr("id").split("-").pop());
	})


	

})









// Images Array Populate and Find Function
function populateArray(){
	var dfd = jQuery.Deferred();
	var str;
	$("img.viewer-img").each(function(){
		var tmpImg = {};
		tmpImg.caption = $(this).attr('data-caption');
		tmpImg.path = $(this).attr('src');
		imagesArray.push(tmpImg);
		$("#viewer-img-reel").append("<li id='viewer-img-reel-li-"+(imagesArray.length-1)+"'><img id='viewer-img-reel-img-"+(imagesArray.length-1)+"' class='viewer-img-reel-images' src='"+tmpImg.path+"' title='"+tmpImg.caption+"'></li>");
	});
	$("#viewer-img-reel-img-"+(imagesArray.length-1)).attr("onload","lastImgLoaded()")

	dfd.resolve();
	console.log("Populating Array of Length ",imagesArray.length);
	return dfd.promise();
}
function findImgInArray(currImg){
	if(imagesArray.length == 0)populateArray()
	var dfd = jQuery.Deferred();
	for(var i = 0; i < imagesArray.length; i++){
		if(imagesArray[i].path == currImg){
			dfd.resolve(i);
			break;
		}
	}
	return dfd.promise();	
}






// Plugin Turn on and off
function turnOn(index){
	isOpen = true;
	$("#imgHolder").css({'display':'block'});
	showImg(index);
}
function turnOff(){
	console.log("Turning OFF")
	isOpen = false;
	$("#imgHolder").fadeOut('fast');
}





// Image Viewing Section
jQuery.fn.reset = function(){
	var dfd = jQuery.Deferred();
	rotateAngle = 0;curScale = 1;
	$("#previewImg")
	.css({
		'height' : 'auto',
		'width' : '500px',
		'top':'0%',
		'left':'0%',
		"transform":'scale('+curScale+') rotate('+rotateAngle+'deg)',
		'transition':'none'
	}).hide("clip",200,function(){dfd.resolve("Reset Successful")});
	return dfd.promise();
}



function showImg(index){
	currentIndex = index;
	console.log("ShowImg Index",index);

	console.log("Calling Reset")
	focusReelImg(index);
	$(document).ready(function(){

		$("#previewImg").reset().then(function(res){
			console.log(res);
			currentIndex = index;
			$("#previewImg")
			.attr({'src':imagesArray[index].path})
			.show("fade",400,function(){
				$(this).css({'transition':'all 0.5s'})
			});
		});
		$("#captionHolder").text(imagesArray[index].caption);
	});
}




function focusReelImg(index){
	$(".focus-reel-img").removeClass("focus-reel-img");
	$("#viewer-img-reel-img-"+index).addClass("focus-reel-img");
	var ths = $("#viewer-img-reel-img-"+index);
	
	$("#viewer-img-reel").animate({
		scrollLeft : (index*100)+horizontalCenter
	},200);
	
}

function centerItVariableWidth(target, outer){
  var out = $(outer);
  var tar = $(target);
  var x = out.width();
  var y = tar.outerWidth(true);
  var z = tar.index();
  var q = 0;
  var m = out.find('li');
  //Just need to add up the width of all the elements before our target. 
  for(var i = 0; i < z; i++){
    q+= $(m[i]).outerWidth(true);
  }
  out.scrollLeft(Math.max(0, q - (x - y)/2));
}

function lastImgLoaded(){
	console.log("Reel Inner Width",$("#viewer-img-reel").innerWidth());

}



// NAVIGATION
function next(){
	console.log(currentIndex);
	if(currentIndex >= imagesArray.length-1) showImg(0);
	else showImg(currentIndex+1);
}
function previous(){
	if(currentIndex == 0 ) showImg(imagesArray.length-1);
	else showImg(currentIndex-1);
}
















// ROTATION
function doRotate(){
	rotateAngle += 90;
	$("#previewImg").css({"transform":'scale('+curScale+') rotate('+rotateAngle+'deg)','transition':'all 0.5s'});
	// $("#previewImg").animateRotate(rotateAngle,curScale,500,'linear',function(){ console.log("Complete Rotate")});
}





// ZOOMING
function zoomIn(){
	curScale *= zoomFactor;
	$("#previewImg").css({"transform":'scale('+curScale+') rotate('+rotateAngle+'deg)','transition':'all 0.5s'})
}
function zoomOut(){
	curScale /= zoomFactor;
	$("#previewImg").css({"transform":'scale('+curScale+') rotate('+rotateAngle+'deg)','transition':'all 0.5s'});
}









// Keyboard+MouseWheel Shortcuts
$(window).on('keydown',function(e){
	if(!isOpen) return;
	if(e.which == 39 && e.ctrlKey){doRotate();return;}
	if(e.which == 39) next();
	if(e.which == 37) previous();
	if(e.which == 38) zoomIn();
	if(e.which == 40) zoomOut();
})

$(window).on('mousewheel', function(event) {
	if(!isOpen) return;
	event.preventDefault();
	(event.originalEvent.wheelDelta > 100)? zoomIn() : zoomOut();
});
