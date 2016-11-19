/*banner*/
window.onload = function() {

	var index = 0;//当前图片
	var imgWidth = 1366;//图片宽度
	var imgCount = document.getElementById('imgs').getElementsByTagName('li').length;//图片数量
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
			index = imgCount - 3;
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
		if(index > imgCount - 3)
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
	// 				imgs.style.left = -imgWidth * (imgCount -2) + 'px';
				
	// 			if( parseInt(position) == -imgWidth * (imgCount - 1)) {
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
			endPos = - imgWidth * (imgCount - 2) + 'px';
		if( parseInt(endPos) < - imgWidth * (imgCount - 2) )
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
	
}



