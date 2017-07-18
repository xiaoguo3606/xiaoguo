/***************
 * 一些自定义函数
 ***************/



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

//设置fullpage插件
function setFullpage(){
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
		normalScrollElements:'#resume-content,.my-opus ul,#contact-me-content',
//		垂直居中
		verticalCentered:true,
		//避免导航栏遮挡
		paddingTop:'0.5rem'
	});
}

//	复制到剪切板,采用clipboard插件
function setCopy(){
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
}

//留言表单
function setForm(){
//	初始化表单
	formInit();
//	当表单项处于焦点状态时,设计样式
	$('.form-control:not(button)').focus(function(){
		var wordsCount=$(this).parent().next('div').find('.words-count');
		wordsCount.css('opacity',1);
	});
//	当表单项失焦时,设计样式
	$('.form-control:not(button)').blur(function(){
		var wordsCount=$(this).parent().next('div').find('.words-count');
		wordsCount.css('opacity',0.5);
	});
//	表单为正常状态及警告状态时的样式,取自bootstrap.css
	var warning={
		'borderColor': '#e96666',
		'outline': 0,
		'-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(233, 175, 102, .6)',
		        'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(233, 175, 102, .6)'
	},
	normal={
		'borderColor':'#ccc',
		'-webkit-box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)',
          'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)'
	};
	
//	姓名及留言在失焦时,不进行正则检查,只检查是否为空
	$('#guest-name,#guest-message').on('blur',function(){
		if($(this).val().length==0){
			validate($(this),false,'不能为空哦！');
			$(this).attr('isRight',0);
		}else{
			validate($(this),true);
			$(this).attr('isRight',1);
		}
	});
	
//	邮箱在失焦时,如果不为空,则进行正则校验
	$('#guest-email').on('blur',function(){
		var regex=/\w+@\w+.\w+/g;
		if($(this).val().length==0){
			validate($(this),true);
			$(this).attr('isRight',1);
		}else if(regex.test($(this).val())){
			validate($(this),true);
			$(this).attr('isRight',1);
		}else{
			validate($(this),false,'邮箱格式不正确！');
			$(this).attr('isRight',0);
		}
	});
	
	
	
	
//	在输入框中,当keyup时,更新字数信息，并设计参数状态
	$('.form-control:not(button)').keyup(function(){
		var wordsCount=$(this).parent().next('div').find('.words-count'),
			len=$(this).val().length,
			max=parseInt(wordsCount.text().split('/')[1]);
		wordsCount.text(len+'/'+max);
//		根据输入的字数改变自定义参数值
		if(len>0 && len<(max-5)){
			wordsCount.attr('data-status',1);
		}else if(len>=(max-5) && len<max){
			wordsCount.attr('data-status',2);
		}else if(len>=max){
			wordsCount.attr('data-status',3);
		}else{
			wordsCount.attr('data-status',0);
		}
		showOut(wordsCount);
	});
	
//	提交留言按钮事件
	$('#submit').click(function(){
		
		var flag1=parseInt($('.form-control').eq(0).blur().attr('isRight')),
			flag2=parseInt($('.form-control').eq(1).blur().attr('isRight')),
			flag3=parseInt($('.form-control').eq(2).blur().attr('isRight')),
			isRight=flag1&&flag2&&flag3;
		if(isRight){
			updateMessage();
			return false;
		}else{
			return false;
		}
		return false;
	})
	
	
//	重置按钮
	$('#reset').click(function(){
		$('.form-control:not(button)').val('');
		formInit();
		$('.help-block').text('');
		$('.form-control:not(button)').css(normal);
		$('.form-control:not(button)').trigger('keyup');
	});

/**
 * 初始化表单，为.words-count初始化参数，并设置其字体颜色
 */
	function formInit(){
		$('.words-count').attr('data-status',0);
		showOut($('.words-count'));
	}

/**
 * 根据自定义参数data-status判断字数，从而确定字体颜色
 * @param {Object} ele 传入的.words-count对象
 */
	function showOut(ele){
		if(ele.attr('data-status')==0){
			ele.css('color','#000');
		}else if(ele.attr('data-status')==1){
			ele.css('color','#0f0');
		}else if(ele.attr('data-status')==2){
			ele.css('color','#ff8c11');
		}else{
			ele.css('color','#f00');
		}
	}
	
	/**
	 * 验证表单后，对表单样式及help-text进行处理
	 * @param {Object} ele 当前的表单对象 
	 * @param {Object} flag 是否正确，true时为正确
	 * @param {Object} str 错误时需要显示的消息
	 */
	function validate(ele,flag,str){
		if(flag){
			$(ele).css(normal);
			$(ele).parent().next('div').find('.help-block').html('');
			return flag;
		}else{
			$(ele).css(warning);
			$(ele).parent().next('div').find('.help-block').html('<span class="fa fa-times-circle"></span>&nbsp;'+str);
			return flag;
		}
	}
	
	function updateMessage(){
		var guestName=$('#guest-name').val(),
			guestEmail=$('#guest-email').val(),
			guestMessage=$('#guest-message').val(),
			message={
				'name':guestName,
				'email':guestEmail,
				'msg':guestMessage
			};
		
		$.ajax({
			type:"POST",
			url:"php/save_guest_msg.php",
			data:message,
			dataType:'json',
			success: function(data){
				console.log(data);
			},
			error: function(jqXHR){
				console.log(jqXHR.status)
			}
		});
		
	}
	
}



