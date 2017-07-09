
var windowHeight=$(window).innerHeight();

$(document).ready(function(){
	getCounter();
	$(window).scroll(function(e){
		if($(window).scrollTop()>=20){
			$('#top-nav').slideUp();
		}else{
			$('#top-nav').slideDown();
		}
	});
});

window.onload=function(){
	$('.bgimg').animate({
		height:0.5*windowHeight+'px'
	});
	$('.header').css('height',windowHeight);
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
