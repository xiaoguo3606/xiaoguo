
$(document).ready(function(){
	
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
		normalScrollElements:'#resume-content',
//		垂直居中
		verticalCentered:true,
		//避免导航栏遮挡
		paddingTop:'0.5rem',
		
		dragAndMove:true
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
	
	
	
//	设置title显示效果,基于jquery ui
	$('#header li,#accordion a,sup').tooltip();
	
//	设置简历页中弹性标签效果,基于jquery ui
	$('#accordion').accordion({
		heightStyle:'fill'
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
