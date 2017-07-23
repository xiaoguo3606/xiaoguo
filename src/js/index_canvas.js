
//本JS主要进行canvas绘图

var section1_canvas=document.getElementById('section1_canvas'),
	section1_canvas_context=section1_canvas.getContext('2d'),
	colors=['rgb(200,200,200)','rgb(200,100,210)','rgb(100,200,220)','rgb(200,200,230)','rgb(200,100,240)','rgb(100,200,255)'],
	x_number=Math.ceil($(document).width()/80),
	y_number=Math.ceil($(document).height()/80);

section1_canvas.width=$(document).width();
section1_canvas.height=$(document).height()-50;


for(var i=0;i<y_number;i++){
	for(var j=0;j<x_number;j++){
		var random=colors[Math.round(Math.random()*colors.length)];
		section1_canvas_context.beginPath();
		section1_canvas_context.arc(10+j*80,10+i*80,30,0,2*Math.PI);
		section1_canvas_context.closePath();
		section1_canvas_context.fillStyle=random;
		section1_canvas_context.fill();
	}
}

