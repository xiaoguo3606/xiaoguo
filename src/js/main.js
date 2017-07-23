

var windowWidth=$(window).innerWidth();
$(document).ready(function(){
	
//	页面淡出效果
	$('body').fadeIn(1000);
	
//	页面访问量统计
	getCounter();
	
//	启用fullpage相关预设
	setFullpage();
	
//	设置表单事件
	setForm();
	
	
//	下一页按钮
	$('#arrow-to-next').click(function(){
		$.fn.fullpage.moveSectionDown();
	});
//	回到顶端按钮
	$('#arrow-to-top').click(function(){
		$.fn.fullpage.moveTo('header');
	});
	
//	移动端,点击各页面之后,收起导航栏
	$('#navbar-nav li').not('.dropdown').on('click',function(){
		if($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').collapse('toggle');
		}
	});

//	针对移动端，在导航栏打开时,点击空白处时收起导航栏(点击除导航以外的区域)
	$('body').children().not('header').click(function(event){
		if($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').collapse('toggle');
			return false;
		}
	});
	
//	针对移动端,修正小屏幕时技能页溢出问题
	if($(window).innerHeight()<520){
		$('.fp-tableCell h4').css('margin-top',0);
		$('.skill img').css({
			'margin-bottom':'0.05rem',
			'margin-top':'0.05rem'
		});
	};
	
//	设置复制按钮,使用Clipboard插件
	setCopy();

	
//	我的作品页,设置响应式事件
	$(window).resize(function(){
		windowWidth=$(window).innerWidth();
		if(windowWidth<=768){
			$('.my-opus-link').unbind();
		}else{
			$('.my-opus-link').hover(function(){
				$(this).children('.black_bg').fadeIn(100,function(){
					$(this).next('.black_bg_link').fadeIn(100);
				});
			},function(){
				$(this).children('.black_bg_link').fadeOut(100,function(){
					$(this).prev('.black_bg').fadeOut(100);
				});
			});
		};
	}).trigger('resize');
	
	
	
//	设置title显示效果,基于jquery ui
	$('.header li').tooltip();
	
//	设置简历页中弹性标签效果,基于jquery ui
	$('#accordion').accordion({
		heightStyle:'fill'
	});
	$('#contact-me-content').accordion({
		heightStyle:'fill'
	});

});