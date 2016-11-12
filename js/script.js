/*banner*/
window.onload = function() {

	var index = 0;//当前图片
	var imgWidth = 1366;//图片宽度
	var imgCount = document.getElementById('banner').getElementsByTagName('img').length;//图片数量
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
		// 索引递减
		index --;
		document.title = index; 
		if(index < 0)
			index = imgCount - 2;
		animate(imgWidth);
	}

	/*
		next
	*/
	next.onclick = function() {
		// 判断动画是否正在进行中
		if(isAnimate) 
			return ;
		// 索引递减
		index ++;
		if(index > imgCount - 3)
			index = 0;
		animate(-imgWidth);
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
				var offset = imgWidth * (index - ii);//计算偏移量
				index = ii;//记录当前
				animate(offset);
				}
		})(i);
	}

	// 动画函数
	function animate(offset) {

		var endPos = parseInt(imgs.style.left) +  offset;//终点位置

		var time = 800;
		var interval = 40;//多少毫秒执行一次
		var speed = offset / (time / interval);//每次移动像素数

		var timerId = setInterval(function(){
			// 获得当前位置
			var position = parseInt(imgs.style.left);

			
			if( speed > 0 && position >= endPos || speed < 0 && position <= endPos) {
				// 终止定时器
				clearInterval(timerId);
				//防止误差
				document.title = index; 
				position = endPos  + 'px';
				//判断是否运动中
				isAnimate = false;
				// 到达替身
				if( position == 0) 
					imgs.style.left = -imgWidth * (imgCount -2) + 'px';
				
				if(position == imgWidth * (imgCount - 1)) 
					imgs.style.left = -imgWidth + 'px';
				return ;
			} 
			// 运动位置
			imgs.style.left = position + speed + 'px';
		},interval);

		isAnimate = true;
		// 高亮函数
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
}