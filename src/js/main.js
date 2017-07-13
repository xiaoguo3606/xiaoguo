//取出窗口的高度
var windowHeight=$(window).innerHeight();
var rem=parseInt($('html').css('font-size'));

$(document).ready(function(){
//	在窗口大小改变时,设置首页高度
	$(window).resize(function(){
		windowHeight = $(window).innerHeight();
		$('body,html').css('height', windowHeight);
		$('.content section').css('height',windowHeight);
	});
	
	$(window).resize();
	
//	当窗口滚动时,监听滚动高度,当滚动高度大于100px时,显示回到顶部图标,否则隐藏
	$(window).scroll(function(event){
		var top=$(window).scrollTop();
		if(top>100){
			$('#arrow-to-top').show();
		}else{
			$('#arrow-to-top').hide();
		}
	});
	$(window).scroll();
	
//	回到顶部
	$('#arrow-to-top').click(function(){
		scrollAnimate(0,500);
	});
	
//	下一页按钮
	$('#arrow-to-next').click(function(){
		var current=$('li.active').not('.dropdown').children('a').attr('href');
		var authors=getAuthors();
		var next=authors.indexOf(current)+1;
		if(next < authors.length){
			scrollAnimate($(authors[next]).offset().top,500);
		}
	});
	
	
	
//	为每一个导航添加点击滚动屏幕的事件
	$('.navbar-nav li').each(function(index,ele){
		var href=$(this).children('a').attr('href');
//		导航栏中a标签必须有确切的值才添加点击事件
		if(href && href!='#'){
			$(this).click(function(event){
				var temp=$(href).offset().top;
				scrollAnimate(temp,500);
				if($('.navbar-collapse').hasClass('in')){
					$('.navbar-collapse').collapse('toggle');
				}
				return false;
			});
		}else{
			return;
		}
	});
	
//	在导航栏打开时,点击空白处时收起导航栏
	$('body').click(function(event){
		if($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').collapse('toggle');
			return false;
		}
	});
});

/**
 * 自定义滚动窗口的动画
 * @param {Object} top 要滚动到的位置
 * @param {Object} speed 滚动速度
 */
function scrollAnimate(top,speed){
	$('html,body').animate({
		scrollTop : top
	},speed);
}


/**
 * 自定义函数，取出全部锚点的href属性值（href不能为空或#），拼按顺序放入一个数组中
 * @return 由锚点所组成的数组，由字符串组成
 */
function getAuthors(){
	var result=new Array();
	$('.navbar-nav li a').each(function(){
		var temp=$(this).attr('href');
		if(temp && temp!='#'){
			result.push(temp);
		}
	});
	return result;
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
