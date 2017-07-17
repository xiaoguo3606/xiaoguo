var windowWidth=$(window).innerWidth();
$(document).ready(function(){
	
//	页面访问量统计
	getCounter();
	
//	启用fullpage相关预设
	$('#content').fullpage({
		menu:'#navbar-nav',
		anchors:['header','resume','front-skill','other-skill','my-opus','contact-me'],
//		设置导航栏的active及下一页按钮的显示与隐藏
		onLeave:function(index,nextIndex,direction){
//			由于导航栏中下拉菜单显示不正常,进行判断并解决
			if(nextIndex==3 || nextIndex==4){
				setTimeout(function(){
					$('#dropdown').addClass('active');
				},30);
			}else{
				setTimeout(function(){
					$('#dropdown').removeClass('active');
				},30);
			}
//			最后一页不再显示下一页按钮
			if(nextIndex==6){
				$('#arrow-to-next').hide();
			}else{
				$('#arrow-to-next').show();
			}
		},
//		显示回到顶部按钮
		afterLoad:function(anchorLink,index){
			if(index>1){
				$('#arrow-to-top').show();
			}else{
				$('#arrow-to-top').hide();
			}
		},
//		触摸灵敏度,15为默认值
		touchSensitivity: 15,
//		在#resume-content中,滚动滚轮或滑动屏幕将不触发翻页
		normalScrollElements:'#resume-content,.my-opus ul',
//		垂直居中
		verticalCentered:true,
		//避免导航栏遮挡
		paddingTop:'0.5rem'
	});
	
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
	
//	复制到剪切板,采用clipboard插件
	var copy=new Clipboard('#copy-email');
	copy.on('success',function(e){
		$('#copy-email').html('<span class="fa fa-check-circle"></span>&nbsp;已复制');
		$('#copy-email').css({
			backgroundColor:'#3cec40',
			borderColor:'#3ddb41',
			color:'#222'
		})
		e.clearSelection();
	});
	copy.on('error',function(e){
		alert('对不起，您的浏览器无法复制，请手动复制...');
	});
	
	
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
	$('#header li,#accordion a,sup').tooltip();
	
//	设置简历页中弹性标签效果,基于jquery ui
	$('#accordion').accordion({
		heightStyle:'fill'
	});
	$('#contact-me-content').accordion({
		heightStyle:'fill'
	});

});








//网站访问量计数器Ajax
function getCounter(){
	$.ajax({
		url:'php/counter.php',
		type:'GET',
		dataType:'text',
		success: function(data){
			$('#guest_count').html('&nbsp;<span class="fa fa-bar-chart" style="color:#a3b2ff"></span>'+data);
		},
		error:function(){
			console.log('网站访问量数据交互出错！');
		}
	});
}

