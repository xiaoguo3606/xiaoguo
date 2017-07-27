
$(document).ready(function(){
	
	
	
	renderHeaderCanvas();
});


function renderHeaderCanvas(){
	var headerCanvas=document.getElementById('header-canvas'),
		balloon=document.getElementById('balloon'),
		context=headerCanvas.getContext('2d');
	headerCanvas.width=$(window).width()-20;
	headerCanvas.height=$(window).height()-50;
	
	balloon.onload=function(){
		context.drawImage(balloon,10,10);
	};
	
}

