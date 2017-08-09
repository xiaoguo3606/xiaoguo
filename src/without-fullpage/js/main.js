
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
			},500,function(){
				$('#header-content-info').fadeIn(500);
				$('#someWords').fadeIn(500);
			});
		});
	});
	
	setInterval(function(){
		$('#today').text(function(){
			var today=new Date(),
				hourStr=today.getHours()>9 ? today.getHours().toString() : '0'+today.getHours(),
				minutesStr=today.getMinutes()>9 ? today.getMinutes().toString() : '0'+today.getMinutes(),
				secStr=today.getSeconds()>9 ? today.getSeconds().toString() : '0'+today.getSeconds();
			return today.getFullYear()+'年'+(today.getMonth()+1)+'月'+today.getDate()+'日 '+hourStr+':'+minutesStr+':'+secStr;
		});
	},1000);
	
	$.ajax({
		type:'POST',
		async:false,
		url:'https://api.weibo.com/oauth2/access_token',
		data:{
			client_id:'1496470922',
			redirect_uri:'http://xiaoguo.pro'
		},
		success:function(data){
			console.log(data)
		},
		error:function(){
			console.log(error)
		}
	})
	
//	$.ajax({
//		type:'GET',
//		url:'https://api.weibo.com/2/common/get_country.json',
//		success:function(data){
//			console.log(data);
//		},
//		error:function(error){
//			console.log(error)
//		}
//	})
	
});


