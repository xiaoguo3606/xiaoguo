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

/**
 * 设置fullpage插件
 */
function setFullpage(){
	$('#content').fullpage({
		menu:'#navbar-nav',
		anchors:['header','resume','front-skill','other-skill','my-opus','contact-me'],
		//设置导航栏的active及下一页按钮的显示与隐藏
		onLeave:function(index,nextIndex,direction){
			//由于导航栏中下拉菜单显示不正常,进行判断并解决
			if(nextIndex==3 || nextIndex==4){
				setTimeout(function(){
					$('#dropdown').addClass('active');
				},30);
			}else{
				setTimeout(function(){
					$('#dropdown').removeClass('active');
				},30);
			}
			//最后一页不再显示下一页按钮
			if(nextIndex==6){
				$('#arrow-to-next').hide();
			}else{
				$('#arrow-to-next').show();
			}
		},
		afterLoad:function(anchorLink,index){
			//判断是否显示回到顶部按钮
			if(index>1){
				$('#arrow-to-top').show();
			}else{
				$('#arrow-to-top').hide();
			}
			var current="."+anchorLink;
			//处理第2页的动画
			if(index==2){
				$(current).find('h1').fadeIn(300,function(){
					$(current).find('.someWords').slideDown(300,function(){
						$('#resume-content').fadeIn(800,function(){
							$('#resume-content h3').eq(1).trigger('click');
							setTimeout(function(){
								$('#resume-content h3').eq(2).trigger('click');
							},600);
							setTimeout(function(){
								$('#resume-content h3').eq(0).trigger('click');
							},1200);
						});
					});
				});
				
				//技能页，初始化时显示动画
			}else if(index==3 || index==4){
				$(current).find('h1').fadeIn(300,function(){
					$(current).find('.someWords').slideDown(300,function(){
						$(current).find('h4').eq(0).css('opacity',1);
						$(current).find('img').eq(0).css('opacity',1);
						$(current).find('.skill-text').eq(0).slideDown(300);
					});
				});
			}else if(index==5){
				$(current).find('li').eq(0).css('opacity',1);
				setTimeout(function(){
					$(current).find('li').eq(1).css('opacity',1);
				},500);
				setTimeout(function(){
					$(current).find('li').eq(2).css('opacity',1);
				},1000);
				setTimeout(function(){
					$(current).find('li').eq(3).css('opacity',1);
				},1500);
			}
		},
		//slide离开页面时，将prev隐藏
		onSlideLeave:function(anchorLink,index,slideIndex,direction,nextSlideIndex){
			var prev=$('.'+anchorLink).find('.slide').eq(slideIndex);
			prev.find('h4').css('opacity',0);
			prev.find('img').css('opacity',0);
			prev.find('.skill-text').slideUp(300);
		},
		//slide到当前页面时，显示当前页内容
		afterSlideLoad:function(anchorLink,index,slideAnchor,slideIndex){
			var current=$('.'+anchorLink).find('.slide').eq(slideIndex);
			current.find('h4').css('opacity',1);
			current.find('img').css('opacity',1);
			current.find('.skill-text').slideDown(300);
		},
		//触摸灵敏度,15为默认值
		touchSensitivity: 15,
		//在#resume-content中,滚动滚轮或滑动屏幕将不触发翻页
		normalScrollElements:'#resume-content,.my-opus ul,#contact-me-content',
		//垂直居中
		verticalCentered:true,
		//避免导航栏遮挡
		paddingTop:'0.5rem'
	});
}

/**
 * 复制到剪切板,采用clipboard插件
 */
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

/**
 * 表单相关处理
 */
function setForm(){
	//	初始化表单
	formInit();
	//	当表单项处于焦点状态时,设计样式
	$('.form-control:not(button)').focus(function(){
		var wordsCount=$(this).parent().next('div').find('.words-count');
		wordsCount.css('opacity',1);
	});
	
	$('.form-control:not(button)').each(function(){
		//当表单项失焦时,设计字数统计的样式及验证表单数据
		$(this).blur(function(){
			var wordsCount=$(this).parent().next('div').find('.words-count');
			wordsCount.css('opacity',0.5);
			validate(this);
		});
		
		//在输入框中,当keyup时,更新字数信息，并设计参数状态
		$(this).keyup(function(){
			updateNumber(this);
			validate(this);
		});
	});
	

	
	
	//	提交留言按钮事件
	$('#submit').click(function(){
		var flag1=parseInt($('.form-control').eq(0).trigger('blur').end().attr('isRight')),
			flag2=parseInt($('.form-control').eq(1).trigger('blur').end().attr('isRight')),
			flag3=parseInt($('.form-control').eq(2).trigger('blur').end().attr('isRight')),
			isRight=flag1&&flag2&&flag3;
		if(isRight){
			updateMessage();
			return false;
		}else{
			return false;
		}
		return false;
	});
	
	//	重置按钮
	$('#reset').click(function(){
		$('.form-control:not(button)').val('');
		formInit();
		$('.help-block').html('');
		$('.form-control:not(button)').css(normal);
		updateNumber($('.form-control').eq(0));
		updateNumber($('.form-control').eq(1));
		updateNumber($('.form-control').eq(2));
	});


	/***********
	 * 以下为内部自定义函数
	 ***********/

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
	 * 更新字数
	 * @param {Object} ele 传入的表单对象
	 */
	function updateNumber(ele){
		var wordsCount=$(ele).parent().next('div').find('.words-count'),
			len=$(ele).val().length,
			max=parseInt(wordsCount.text().split('/')[1]);
		wordsCount.text(len+'/'+max);
		//根据输入的字数改变自定义参数值
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
	}
	
	
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
	
	
	/**
	 * 验证表单后，对表单样式及help-text进行处理
	 * @param {Object} ele 当前的表单对象 
	 */
	function validate(ele){
		//取到help-text对象
		var info=$(ele).parent().next('div').find('.help-block');
		//当表单值为空时
		if($(ele).val().length==0){
			//当id是guest-email时,选填,可以为空
			if($(ele).attr('id')=='guest-email'){
				$(ele).css(normal);
				info.html('');
				$(ele).attr('isRight',1);
			}else{		//其它两个不能为空
				$(ele).css(warning);
				info.html('<span class="fa fa-times-circle"></span>&nbsp;不能为空哦！');
				$(ele).attr('isRight',0);
			}
		}else{
			if($(ele).attr('id')=='guest-email'){
				var regex=/\w+@\w+.\w+/g;
				if(regex.test($(ele).val())){
					$(ele).css(normal);
					info.html('');
					$(ele).attr('isRight',1);
				}else{
					$(ele).css(warning);
					info.html('<span class="fa fa-times-circle"></span>&nbsp;邮箱格式不正确！');
					$(ele).attr('isRight',0);
				}
			}else{
				$(ele).css(normal);
				info.html('');
				$(ele).attr('isRight',1);
			}
		}
	}
	/*
	 * 将留言内容保存至数据库
	 */
	function updateMessage(){
		var guestName=$('#guest-name').val(),
			guestEmail=$('#guest-email').val(),
			guestMessage=$('#guest-message').val(),
			message={
				'name':guestName,
				'email':guestEmail,
				'msg':guestMessage
			};
		
		//表单留言
		$.ajax({
			type:"POST",
			url:"php/save_guest_msg.php",
			data:message,
			dataType:'text',
			success: function(data){
				if(data=='success'){
					msgSuccess();
				}else{
					msgFail(data);
				}
			},
			error: function(jqXHR){
				alert('对不起，留言失败！');
				console.log(jqXHR.status);
			}
		});
		return false;
	}
	
	/**
	 * 留言成功时执行
	 */
	function msgSuccess(){
		$('#reset').trigger('click');
		$('#success-msg').fadeIn(500);
		setTimeout(function(){
			$('#success-msg').fadeOut(500);
		},1000);
	}
	/**
	 * 留言失败时执行
	 * @param {Object} data 从后端返回的数据
	 */
	function msgFail(data){
		alert("对不起，留言失败，错误信息："+data+",站长将尽快解决此问题！");
	}
	
}



