
var windowHeight=$(window).innerHeight();
var rem=parseInt($('html').css('font-size'));
$(document).ready(function(){
	$(window).resize(setIndexHeight());
});


function setIndexHeight(){
	console.log(rem);
//	$('#header picture img').css('max-height',0.5*windowHeight);
	$('#header').css('height',windowHeight);
	$('.resume').css('margin-top',0);
}

//网站访问量计数器Ajax
function getCounter(){
	$.ajax({
		type:"get",
		url:"../php/counter.php",
		async:true,
		dataType:'text',
		success:function(data){
			$('#welcome').text(data);
		},
		error:function(jqXHR){
			$('#welcome').text('欢迎您！');
		}
	});
}
