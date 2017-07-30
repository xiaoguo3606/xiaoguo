
$(document).ready(function(){
	$('#header').css('height',$(window).height());
	$('#header').find('.content').find('img').rotate({
		angle:-30,
		animateTo:0
	});
	$('#header').find('.content').find('img').animate({
		opacity:1
	},800,function(){
		$('#header-title-bg').animate({
			width:$('#header').find('h4').css('width'),
			opacity:1
		},500,function(){
			$('#header').find('h4').animate({
				opacity:1
			},500);
		});
	});
});


