
// JavaScript Document
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];    
	} else{
		return getComputedStyle(obj,false)[name];
	}
}

function startMove(obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for (var attr in json) {
            var cur = 0;
            if (attr == "opacity") {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr))
            }
            var speed = (json[attr] - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur !== json[attr]) {
                bStop = false;
            };
            if (attr == "opacity") {
                obj.style.opacity = (speed + cur) / 100;
                obj.style.filter = 'alpha(opacity:' + (speed + cur) + ')';
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();
        }
    }, 30)
}


var wrap = document.getElementById('wrap');
var content = document.getElementById('content');
var tips = document.getElementById('tips');
var aLi = tips.getElementsByTagName('li');
var now = 0;
//var 
for (var i = 0; i < aLi.length; i++) {
	aLi[0].className = 'active';                //把初始状态定义好
	content.style.left = 0 +'px';
	aLi[i].index = i; //自定义属性
	aLi[i].onclick = function() {
		now = this.index;
		play();
	}
}

function play() {
	for (var j = 0; j < aLi.length; j++) {
		aLi[j].className = '';
	}
	aLi[now].className = 'active';


	startMove(content, {
		left: -1000 * now, //你还真别说  轮播图 图片宽度
	});
}

function autoPlay() {
	now++;
	if (now == aLi.length) {
		now = 0;
	}
	play();
}

var timer = setInterval(autoPlay, 2000);
wrap.onmouseover = function(){                  //这里如果把事件绑定到ul上的话，那么鼠标移入，下面对饮的li会不起作用，
	clearInterval(timer);                       //因为li的层级比较高，所以应该把事件绑定到大的div上
}
wrap.onmouseout = function(){
	timer = setInterval(autoPlay,2000);
	//setInterval(autoPlay,2000);   不能这么写，凡是开的定时器，必须得赋值，要不然总会多开一个定时器，导致速度加快
}




