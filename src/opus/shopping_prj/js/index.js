//阻止除锚点之外的超链接的默认跳转
$('a').not('.floor_nav a').click(function(event){
	event.preventDefault();
})

//页面启动时立即执行的事件
$(function(){
	//	在页面初始化时,开始轮播图
	$('.banner_center').mouseleave();
	//避免刷新页面时导航栏消失，因此在此触发一次scroll事件
	$(window).scroll();
});

//为顶部伸缩菜单绑定鼠标悬停时的效果
$('#header_right>ul>li').each(function(index,element){
//	排除没有下拉菜单的项
	if($(this).children('div').length!=0){
		$(this).hover(function(event){
			$(this).children('div').show();
			$(this).css({
				'background':'#fafafa',
				'border-color':'#ccc'
			});
		},function(event){
			$(this).children('div').hide();
			$(this).css({
				'background':'',
				'border-color':'rgba(100%,100%,100%,0)'
			});
		});
	}
});

//"亲，请登录"点击效果,显示登录框
$('.header_left a:nth-child(1)').click(function(event){
	changeInput('login');
	$('.loginAndRegArea').show();
});
//"免费注册"点击效果,显示注册框
$('.header_left a:nth-child(2)').click(function(event){
	changeInput('reg');
	$('.loginAndRegArea').show();
});
//黑色半透明背景处,在点击时关闭登录/注册框
$('.backLayer').on('click',function(event){
	$('.loginAndRegArea').hide();
	resetForms();
});
//登录/注册框关闭按钮
$('.closeButton').click(function(event){
	$('.loginAndRegArea').hide();
	resetForms();
});
//关闭登录/注册框时,需要重置登录/注册框中的内容
var resetForms=function(){
	$('.loginInput').children('form')[0].reset();
	$('.regInput').children('form')[0].reset();
	$('#login_username_info').text('');
	$('#login_password_info').text('');
	$('#reg_username_info').text('');
	$('#reg_check_code_info').text('');
};
//登录/注册对话框中标题点击切换表格
$('#login').click(function(event){
	changeInput('login');
});
//登录/注册对话框中标题点击切换表格
$('#reg').click(function(event){
	changeInput('reg');
});
//由于以下代码多次使用,封装为函数,用于在登录/注册框切换时调用，传入的参数为指令字符串
var changeInput=function(order){
	if(order=='login'){
		$('#login').css({
			'color':'red',
			'border-color':'red'
		});
		$('#reg').css({
			'color':'black',
			'border-color':'#fff'
		});
		$('.loginInput').show();
		$('.regInput').hide();
	}else if(order=='reg'){
		$('#login').css({
			'color':'black',
			'border-color':'#fff'
		});
		$('#reg').css({
			'color':'red',
			'border-color':'red'
		});
		$('.loginInput').hide();
		$('.regInput').show();
	}else{
		return;
	}
}
//表单验证--登录页面用户名正则验证
$('#login_username').blur(function(event){
	var inputValue=$(this).val();
	checkFormInput(inputValue,'\\w+@\\w+\\\\.\\w+|\\d{11}','login_username_info','请输入正确的邮箱或手机号');
});
//登录页面密码框正则验证
$('#login_password').blur(function(event){
	var inputValue=$(this).val();
	checkFormInput(inputValue,'\\S{6,16}','login_password_info','密码为6-16位，不能有空格');
});
//注册页面用户名正则验证
$('#reg_username').blur(function(event){
	var inputValue=$(this).val();
	checkFormInput(inputValue,'\\w+@\\w+\\\\.\\w+|\\d{11}','reg_username_info','请输入正确的邮箱或手机号');
});
//验证码输入框的正则验证
$('#reg_check_code').blur(function(event){
	var inputValue=$(this).val();
	checkFormInput(inputValue,'gyyd','reg_check_code_info','验证码输入错误');
});
//自定义函数,用于进行正则验证
var checkFormInput=function(checkValue,regex,showId,info){
	var regObj=new RegExp(regex,'i');
	console.log(regObj);
	if(regObj.test(checkValue)){
		$('#'+showId).text('');
	}else{
		$('#'+showId).text(info);
	}
}

//购物车相关
//	购物车鼠标悬停按钮效果
$('.logoArea_shoppingCar').mouseenter(function(event){
	$('.shoppingCar_title').css({
		'background-color':'#fff',
		'border-color':'#ccc'
	});
	$('#shoppingCar_logo').removeClass('shoppingCar_logo_default').addClass('shoppingCar_logo_hover');
	$('.shoppingCar_title').children('a').css({
		'color':'red',
		'border-color':'red'
	});
	$(this).children('span').css('color','red');
	$('#shoppingCar_num').css('color','red');
	$('#shoppingCar_arrow').removeClass('shoppingCar_arrow_default').addClass('shoppingCar_arrow_hover');
	$('.shoppingCar_hidden').show();
});
$('.logoArea_shoppingCar').mouseleave(function(event){
	$('.shoppingCar_title').css({
		'background-color':'#f01414',
		'border-color':'#f01414'
	});
	$('#shoppingCar_logo').removeClass('shoppingCar_logo_hover').addClass('shoppingCar_logo_default');
	$('.shoppingCar_title').children('a').css({
		'color':'#fff',
		'border-color':'#fff'
	});
	$('#shoppingCar_num').css('color','#fff');
	$('#shoppingCar_arrow').removeClass('shoppingCar_arrow_hover').addClass('shoppingCar_arrow_default');
	$('.shoppingCar_hidden').hide();
});

//商品分类栏的鼠标悬停效果,显示二级标题
$('.banner_left li:gt(0)').each(function(index,element){
	$(this).mouseenter(function(event){
		$(this).css('background','#fff');
		$(this).children('a').css('color','#f00');
		$(this).children('img').attr('src','img/icon/24.png');
		$(this).children('div').show();
	});
	$(this).mouseleave(function(event){
		$(this).css('background','');
		$(this).children('a').css('color','#fff');
		$(this).children('img').attr('src','img/icon/23.png');
		$(this).children('div').hide();
	});
});

//轮播图效果
//	定义全局变量
var index=0,timer=null,imgs=$('.banner_center img'),len=imgs.length,points=$('.points div');
//	使用mouseleave事件,防止鼠标划过按钮时多次触发事件
$('.banner_center').mouseleave(function(event){
//	设置定时器timer,间隔时间为2s
	timer=setInterval(function(){
//		当index为最大值时,将index置零
		if(index==len-1){
			index=0;
			changeImg();
		}else{
			index++;
			changeImg();
		}
	},2000);
});
//设置自定义函数,用于改变图片
var changeImg=function(){
//	遍历,每次将所有的图片及圆点的class清除,再重新设置	
	for(var i=0;i<len;i++){
		if(index==i){
			imgs.eq(i).removeClass();
			points.eq(i).removeClass();
			imgs.eq(i).toggleClass('current_img');
			points.eq(i).toggleClass('current_point');
		}else{
			imgs.eq(i).removeClass();
			points.eq(i).removeClass();
			imgs.eq(i).toggleClass('default_img');
			points.eq(i).toggleClass('default_point');
		}
	}
};
//当鼠标进入banner图区域时,停止定时器
$('.banner_center').mouseenter(function(event){
	clearInterval(timer);
});
//上一张图片按钮点击事件
$('#prev').click(function(event){
	if(index==0){
		index=len-1;
		changeImg();
	}else{
		index--;
		changeImg();
	}
});
//下一张图片按钮点击事件
$('#next').click(function(event){
	if(index==len-1){
		index=0;
		changeImg();
	}else{
		index++;
		changeImg();
	}
});
//为每一个圆点设置属性与点击切换图片事件
points.each(function(point_index,element){
//	设置一个自定义属性,用于存储图片的索引
	$(this).attr('imgIndex',point_index);
//	为每一个圆点设置点击事件
	$(this).click(function(event){
		index=parseInt($(event.target).attr('imgIndex'));
		changeImg();
	});
});

//为慕快报下方的方块区域批量添加背景图样式及鼠标悬停效果
$('.blocks').children('a').each(function(block_index,element){
	var temp_index=block_index+1;
	$(this).css({
			'background':'url(img/icon/'+temp_index+'.png) center 10px no-repeat',
			'background-size':'20px 20px'
	});
	$(this).hover(function(event){
		$(this).css({
			'background':'url(img/icon/'+temp_index+'.png) center 10px no-repeat #eee',
			'background-size':'20px 20px'
		});
	},function(event){
		$(this).css({
			'background':'url(img/icon/'+temp_index+'.png) center 10px no-repeat',
			'background-size':'20px 20px'
		});
	});
});

//添加左侧楼层导航事件
//	取得窗体高度、各个商品模块上top值
var windowHeight=$(window).height(),
	f1TopHeight=$('#f1').offset().top,
	f2TopHeight=$('#f2').offset().top,
	f3TopHeight=$('#f3').offset().top,
	f4TopHeight=$('#f4').offset().top,
	f5TopHeight=$('#f5').offset().top;
//	添加滚动事件,控制导航栏显示和消失的时机
$(window).scroll(function(event){
	var windowScrollTop=$(window).scrollTop();
	var tempHeight=windowScrollTop+windowHeight;
	if(tempHeight>=f2TopHeight){	//如果网页长度增加，应设置上限隐藏，针对本项目，暂未设置上限。
		$('.floor_nav').show();
	}else{
		$('.floor_nav').hide();
	}
});
//	添加滚动事件,控制导航栏随着滚动发生变化的时机
$(window).scroll(function(event){
	var windowScrollTop=$(window).scrollTop();
	if(windowScrollTop<=f1TopHeight){
		changeNavA(0,'#f1');
	}else if(windowScrollTop>f1TopHeight&&windowScrollTop<=f2TopHeight){
		changeNavA(1,'#f2');
	}else if(windowScrollTop>f2TopHeight&&windowScrollTop<=f3TopHeight){
		changeNavA(2,'#f3');
	}else if(windowScrollTop>f3TopHeight&&windowScrollTop<=f4TopHeight){
		changeNavA(3,'#f4');
	}else if(windowScrollTop>f4TopHeight&&windowScrollTop<=f5TopHeight){
		changeNavA(4,'#f5');
	}else{
		return;
	}
});
//	为每一个导航图标设置点击切换事件,利用锚完成
var floorNavA=$('.floor_nav a');
floorNavA.each(function(a_index,element){
	$(this).click(function(event){
		var pointTo=$(this).attr('href');
		var anchorIndex=parseInt(pointTo.substring(2))-1;
		var thisPoint=$(pointTo).offset().top;
		$(window).scrollTop(thisPoint);
		changeNavA(anchorIndex,pointTo);
	});
});
//	自定义函数,完成切换导航效果
var changeNavA=function(anchorIndex,pointTo){
	for(var i=0;i<floorNavA.length;i++){
		if(floorNavA.eq(i).hasClass('current_anchor')){
			floorNavA.eq(i).removeClass('current_anchor');
			floorNavA.eq(i).text('F'+(i+1));
		}
	}
	var thisAnchor=floorNavA.eq(anchorIndex);
	thisAnchor.addClass('current_anchor');
	switch(pointTo){
		case '#f1':
			thisAnchor.text('服装');
			break;
		case '#f2':
			thisAnchor.text('个护');
			break;
		case '#f3':
			thisAnchor.text('手机');
			break;
		case '#f4':
			thisAnchor.text('家电');
			break;
		case '#f5':
			thisAnchor.text('电脑');
			break;
		default:
			break;
	}
}

//为每一个楼层的分类信息添加鼠标效果
$('.sub_floor_select').each(function(select_index,element){
	$(this).children('span').each(function(span_index,span_element){
		$(this).attr('span_id',span_index);
		$(this).mouseenter(function(event){
			var tempSpanId=parseInt($(this).attr('span_id'));
			var divs=$(this).parents('.sub_floor').children('.sub_floor_goods_wrap').children('div');
			for(var i=0;i<3;i++){
				divs.eq(i).hide();
			}
			divs.eq(tempSpanId).show();
		});
	});
});

//右侧导航栏动画效果
$('.right_nav_icons').children('div').each(function(right_nav_icons_index,element){
	$(this).attr('right_nav_icons_index',right_nav_icons_index);
	$(this).hover(function(event){
		var tempIndex=parseInt($(this).attr('right_nav_icons_index'));
		var divs=$(this).parents('.right_nav').children('.right_nav_icon_info').children('div');
		divs.eq(tempIndex).animate({right:'30px'});
	},function(event){
		var tempIndex=parseInt($(this).attr('right_nav_icons_index'));
		var divs=$(this).parents('.right_nav').children('.right_nav_icon_info').children('div');
		divs.eq(tempIndex).animate({right:'-20px'});
	});
});
//为回到顶部按钮添加点击效果
$('.right_nav_icons').children('div:last-child').click(function(event){
	$(window).scrollTop(0);
});