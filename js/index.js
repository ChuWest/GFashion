/*banner*/
window.onload = function() {

	var index = 0;//当前图片
	var imgWidth = 1366;//图片宽度
	var womenImgCount = document.getElementById('imgs').getElementsByTagName('li').length;//图片数量
	var isAnimate = false;//动画同步标示
	var prev = document.getElementById('prev');//前张
	var next = document.getElementById('next');//后张
	var imgs = document.getElementById('imgs');//相框
	
	// 获取changerBar对象组
	var changeBars = document.getElementById('changeBar').getElementsByTagName('a');

	/*
		prev
	*/
	prev.onclick = function() {
		// 判断动画是否正在进行中
		if(isAnimate) 
			return ;
		// 清除文字动画
		delAnimate(index);
		// 索引递减
		index --;
		if(index < 0)
			index = womenImgCount - 3;
		animate(imgWidth);
		// 文字动画函数
		textAnimate(index);
	}

	/*
		next
	*/
	next.onclick = function() {
		// 判断动画是否正在进行中
		if(isAnimate) 
			return ;
		// 清除文字动画
		delAnimate(index);
		// 索引递减
		index ++;
		if(index > womenImgCount - 3)
			index = 0;
		animate(-imgWidth);

		// 执行文字动画函数
		textAnimate(index);
	}

	/*
		点选条单击切图
	*/
	// 单击事件,闭包
	for(var i = 0;i < changeBars.length;i ++) {
		(function(ii){
			changeBars[ii].onclick = function() {

				// 判断动画是否进行
				if(isAnimate) 
					return;

				// 清除文字动画
				delAnimate(index);
				var offset = imgWidth * (index - ii);//计算偏移量
				index = ii;//记录当前
				// 文字动画函数
				textAnimate(index);
				animate(offset);
				}
		})(i);
	}

	// 动画函数js动画,误差动画,注意与transition冲突
	// function animate(offset) {

	// 	var endPos = parseInt(imgs.style.left) +  offset;//终点位置

	// 	var time = 400;
	// 	var interval = 40;//多少毫秒执行一次
	// 	var speed = offset / (time / interval);//每次移动像素数

	// 	var timerId = setInterval(function(){
	// 		// 获得当前位置
	// 		var position = parseInt(imgs.style.left);

			
	// 		if( speed > 0 && position >= endPos || speed < 0 && position <= endPos) {
	// 			// 终止定时器
	// 			clearInterval(timerId);
	// 			//判断是否运动中
	// 			isAnimate = false;
	// 			//纠正误差
	// 			position = imgs.style.left = endPos  + 'px';
	// 			// 到达替身
	// 			if( parseInt(position) == 0)
	// 				imgs.style.left = -imgWidth * (womenImgCount -2) + 'px';
				
	// 			if( parseInt(position) == -imgWidth * (womenImgCount - 1)) {
	// 				imgs.style.left = -imgWidth + 'px';
	// 			}
	// 		} 
	// 		// 运动位置
	// 		imgs.style.left = position + speed + 'px';
	// 	},interval);

	// 	isAnimate = true;
	// 	// 高亮函数
	// 	hightLight();
	// }

	/*
		运动函数2
	*/
	function animate(offset) {
		var endPos = parseInt(imgs.style.left) + offset + 'px';
		//位置判定
		if( parseInt(endPos) > -imgWidth)
			endPos = - imgWidth * (womenImgCount - 2) + 'px';
		if( parseInt(endPos) < - imgWidth * (womenImgCount - 2) )
			endPos = -imgWidth + 'px';
		imgs.style.left = endPos;
		hightLight();
	}

	/*
		高亮函数
	*/
	function hightLight() {
		// 清除高亮
		for(var i = 0;i < changeBars.length;i ++)  {
			changeBars[i].className = '';
		}
		// 当前高亮
		changeBars[index].className = 'active';
	}

	/*清除图片文字动画*/
	function delAnimate(which) {
		switch(which) {
			case 0: {
				$('#banner .textContainer .top').removeClass('activeTop');
				$('#banner .textContainer .mid').removeClass('activeMid');
				$('#banner .textContainer .bottom').removeClass('activeBottom');
			}
			case 1: {
				$('#sale').slideUp(1, function() {
					$('#sale').siblings('.left').animate({
						left: -500},
						1, function() {
							$('#second p:last').fadeOut(1);
					});
					$('#sale').siblings('.right').animate({
						right: -500},1);
				});
				break;
			}
			case 2: {
				$('#third .top').animate({
					top: 500},
					1, function() {
						$('#third .bottom').animate({top:600}, 1);
				});
			}
		}
	}

	/*执行图片文字动画*/
	function textAnimate(which) {
		switch(which) {
			case 0: {
				$('#banner .textContainer .top').addClass('activeTop');
				$('#banner .textContainer .mid').addClass('activeMid');
				$('#banner .textContainer .bottom').addClass('activeBottom');
			}
			case 1: {
				$('#sale').slideDown(800, function() {
					$('#sale').siblings('.left').animate({
						left: 0},
						800, function() {
							$('#second p:last').fadeIn(800);
					});
					$('#sale').siblings('.right').animate({
						right: 0},400);
				});
				break;
			}
			case 2: {
				$('#third .top').animate({
					top: 0},
					800, function() {
						$('#third .bottom').animate({top:130}, 400);
				});
			}
		}
	}


	/*
		星条悬停
	*/
	var showStar = document.getElementsByName('showStar');//最外层容器对象
	var FaceWrapper = document.getElementsByName('FaceWrapper');//控制前层星星长度容器
	var stars = FaceWrapper[0].getElementsByTagName('li');
	var starWidth = stars[0].clientWidth;//星星宽度
	var startCount = stars.length;//星星个数
	var starCtnr = showStar[0].clientWidth;
	// 悬停动画
	for(var i = 0;i < showStar.length;i ++) {
		(function(ii){
			showStar[ii].onmousemove = function(e) {
				e = e || window.event;
				var starInt = parseInt(e.layerX / starWidth);//整数个星星
				// 半星or全星
				if(e.layerX % starWidth >= starWidth / 2)
					 FaceWrapper[ii].style.width = (starInt + 1)* starWidth + 'px';
				else 
					FaceWrapper[ii].style.width = starInt * starWidth + starWidth / 2 + 'px';
			}
		})(i);
	}


	/*
		登录login
	*/	

	$('#login').click(function(event) {
		popWin.showWin("350","530","LOG IN","login.html");
	});


	/*
		点击放大图片,事件委托
	*/

	//女装部分
	$('.showCtnr').on('click', '.magnifer', function(event) {
		$('#pictureCoverWrap').css('display','block');
		$('icon-arrow-left2#pictureCover').children('img').attr('src',$(this).parent('.showHider').siblings().first().get(0).src);
	});

	// 关闭放大图片蒙版
	$('#shrink').click(function(event) {
		$('#pictureCoverWrap').css('display','none');
	});


	/*
		加入购物车动画
	*/

	$('.showCtnr').on('click', '.icon-cart', function(event) {
		var that = $(this).parent().prev().prev();
		that.css('left',event.clientX - event.offsetX + 'px').css('top',event.clientY - event.offsetY + 'px');
		that.addClass('cartani');
		setTimeout(function(){
			that.css('left',2000+ 'px').css('top',1000 + 'px');
			that.removeClass('cartani');//清除样式反复添加
		},1800);
	});

	/*
		加载更多
	*/

	var womenPic = 0;//计数,女
	var menPic = 0;//男
	var womenPicCount = $('.women .showCtnr > li').length;//总图片数,女
	var menPicCount = $('.men .showCtnr > li').length;
	var womenImgCount = 4;//页面显示图片数,女
	var menImgCount = 5;//

	// 位移距离
	var margin0 = $('.women .showCtnr > li').eq(0).css('marginRight');
	var margin1 = $('.men .showCtnr > li').eq(0).css('marginRight');
	var womenWidth = $('.women .showCtnr > li').get(0).clientWidth + parseInt(margin0);
	var menWidth = $('.men .showCtnr > li').get(0).clientWidth + parseInt(margin1);
	//womennext 
	$('.womenNext').click(function(event) {
		//动画正在运行则返回
		if($('.women .showCtnr').is(":animated")) {return;}
		womenPic ++;
		// 当前位置
		var posCurrent = $('.women .showCtnr').get(0).style.left;
		//判断是否到最后
		if(womenPic > womenPicCount - womenImgCount) {
			posEnd = 0;
			womenPic = 0;
		}
		else {
			posEnd = parseInt(posCurrent) - womenWidth;//终点位置
		}
		$('.women .showCtnr').animate({left:posEnd}, 800);
		//小图放大动画
		$('.women .showCtnr > li').eq(womenPic + womenImgCount - 1).addClass('fullPic');
	});

	//womenprev
	$('.womenPrev').click(function(e){
		if($('.women .showCtnr').is(":animated")) {return;}
		womenPic --;
		// 当前位置
		var posCurrent = $('.women .showCtnr').get(0).style.left;
		//判断是否到最后
		if(womenPic <= 0) {
			posEnd = - (womenPicCount - womenImgCount) * womenWidth;
			womenPic = womenPicCount - womenImgCount + 1;
		}
		else {
			posEnd = parseInt(posCurrent) + womenWidth;//终点位置
		}
		$('.women .showCtnr').animate({left:posEnd}, 800);
		//小图放大动画
		$('.women .showCtnr > li').addClass('fullPic');
	});

	//mennext 
	$('.menNext').click(function(event) {
		//动画正在运行则返回
		if($('.men .showCtnr').is(":animated")) {return;}
		menPic ++;
		// 当前位置
		var posCurrent = $('.men .showCtnr').get(0).style.left;
		//判断是否到最后
		if(menPic > menPicCount - menImgCount) {
			posEnd = 0;
			menPic = 0;
		}
		else {
			posEnd = parseInt(posCurrent) - menWidth;//终点位置
		}
		$('.men .showCtnr').animate({left:posEnd}, 800);
		//小图放大动画
		$('.men .showCtnr > li').eq(menPic + menImgCount - 1).addClass('fullPic');
	});

	//menprev
	$('.menPrev').click(function(e){
		if($('.men .showCtnr').is(":animated")) {return;}
		menPic --;
		// 当前位置
		var posCurrent = $('.men .showCtnr').get(0).style.left;
		//判断是否到最后
		if(menPic <= 0) {
			posEnd = - (menPicCount - menImgCount) * menWidth;
			menPic = menPicCount - menImgCount + 1;
		}
		else {
			posEnd = parseInt(posCurrent) + menWidth;//终点位置
		}
		$('.men .showCtnr').animate({left:posEnd}, 800);
		//小图放大动画
		$('.men .showCtnr > li').addClass('fullPic');
	});
}




