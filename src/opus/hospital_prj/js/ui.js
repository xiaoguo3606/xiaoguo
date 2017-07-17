//定义搜索区域的UI函数
$.fn.UiSearch=function(){
	var ui=$(this);
	
	$('.ui-search-selected',ui).on('click',function(event){
		$('.ui-search-select-list').show();
		return false;
	});
	
	$('.ui-search-select-list a',ui).on('click',function(event){
		$('.ui-search-selected').text($(this).text());
		$('.ui-search-select-list').hide();
		return false;
	});
	$('body').click(function(event){
		$('.ui-search-select-list').hide();
	});
};

//为主页中点击选项卡切换内容制作UI函数
$.fn.UiSwitch=function(){
	var ui=$(this);
	$('.ui-system-title a',ui).click(function(event){
		var thisIndex=$(this).index();
		for(var i=0;i<$('.ui-system-title a').length;i++){
			$('.ui-system-content').eq(i).removeClass('ui-system-content-current');
			$('.ui-system-title a').eq(i).removeClass('ui-system-title-current');
		}
		$('.ui-system-content').eq(thisIndex).addClass('ui-system-content-current');
		$('.ui-system-title a').eq(thisIndex).addClass('ui-system-title-current');
		return false;
	});
};
//为回到顶部按钮制作UI函数
$.fn.UiBacktop=function(){
	var ui=$(this);
	var windowHeight=$(window).height();
	
	$(window).on('scroll',function(event){
		var scrollHeight=$(this).scrollTop();
		if(scrollHeight>=windowHeight*0.5){
			ui.show();
		}else{
			ui.hide();
		}
	}).triggerHandler('scroll');
	ui.click(function(event){
		$(window).scrollTop(0);
	});
};
//为科室排班表建立UI函数，并为科室排班列表初始化数据及更新数据
//	定义当天日期变量
var today=new Date();
$.fn.UiSlider=function(){
	var ui=$(this);
//	将当天的日期数据写入表格中的第一列
	$('.ui-date',ui).html(getDateStr(today));
//	增加13天,初始化两周（共14天）的数据
	var tempDate=plusSomeDay(today,13);
	
//	左箭头的点击效果:向左滑动7天（658px）
	$('.ui-content-btn-left',ui).click(function(event){
//		当左边有可移动空间时（left<0）,且移动空间长度是658的整数倍(避免移动动画过程中重复点击出现的BUG)时,可以移动
		if($('.ui-date-wrap').position().left<0&&$('.ui-date-wrap').position().left%658==0){
//			点击向左箭头时,wrap的实际移动方向是向右，即left增加658px
			var tempLeft=$('.ui-date-wrap').position().left+658;
			$('.ui-date-wrap').css('left',tempLeft);
			return false;
		}else{
			return false;
		}
	});
//	右箭头的点击效果:向右滑动7天(658px)
	$('.ui-content-btn-right',ui).click(function(event){
//		当wrap的左边距为658的整数倍时,可以移动
		if($('.ui-date-wrap').position().left%658==0){
//			点击向右箭头时,wrap的实际移动方向是向左，即left减小658px
			var tempLeft=$('.ui-date-wrap').position().left-658;
			$('.ui-date-wrap').css('left',tempLeft);
//			此时,在wrap右方追加7天的数据，并将返回值存入tempDate中
			tempDate=plusSomeDay(tempDate,7);
			return false;
		}else{
			return false;
		}
	});
};
/**
 * 在wrap中追加dateIn天之后num天的数据
 * @param {Date} dateIn 所有追加的日期数据在此日期之后
 * @param {Number} num 要追加的天数
 */
var plusSomeDay=function(dateIn,num){
	for(var i=0;i<num;i++){
//		dateIn增加1天,将新的dateIn存入tempDate中
		var tempDate=new Date(dateIn.setDate(dateIn.getDate()+i+1));
//		将tempDate转化为本站所需要的日期字符串
		var tempDateStr=getDateStr(tempDate);
//		将日期字符串写入html代码中,与html文档中的模板相同
		var htmlStr='<div class="ui-oneday"><div class="ui-date">'+tempDateStr+'</div><div class="ui-am"></div><div class="ui-pm ui-notNull">已满诊</div><div class="ui-night"></div></div>';
		$('.ui-date-wrap').append(htmlStr);
//		更新wrap的宽度
		var dateLen=$('.ui-date').length;
		$('.ui-date-wrap').css('width',dateLen*94+'px');
//		重置dateIn
		dateIn.setDate(dateIn.getDate()-i-1);
//		当转换完成时,返回tempDate
		if(i==num-1){
			return tempDate;
		}else{
			continue;
		}
	}
}
/**
 * 将日期类型转换为本站所需要的日期字符串
 * @param {Date} dateObj 传入的日期型数据
 */
var getDateStr=function(dateObj){
	return getWeekDay(dateObj.getDay())+'<br />'+dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate();
};
/**
 * 将传入的星期的数据转换为中文字符串
 * @param {Number} daySum 为Date.getDay()返回的星期数据，由于是0-6的整数，因此在此处进行判断
 */
var getWeekDay=function(daySum){
	switch(daySum){
		case 0:
			return '星期日';
			break;
		case 1:
			return '星期一';
			break;
		case 2:
			return '星期二';
			break;
		case 3:
			return '星期三';
			break;
		case 4:
			return '星期四';
			break;
		case 5:
			return '星期五';
			break;
		default:
			return '星期六';
			break;
	}
};


//页面初始化后执行的主函数
$(function(){
	$('.ui-timetable-content-left').UiSlider();
	$('.ui-search').UiSearch();
	$('.ui-system').UiSwitch();
	$('.ui-backTop').UiBacktop();
});
