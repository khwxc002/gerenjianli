$(function() {
    init();
    changImg(); //解决第一次第一张到第二张的时间间隔
    start();
	$("#aeaatwoxmsjzt1").text('九龙街道');
});
//初始化
function init() {
    var len = $('#img img').length; //获取图片有多少张
    var html = '';
    //显示第一张图片
    $('#dt div').first().css('display', 'block');
	
}
//图片轮播
function changImg(num) {
    if (num == 'auto') { //定时器自动调用
        num = index;
		// console.log(num);
    } else { //鼠标放上的时候 清楚定时器
        clearInterval(timer);
    }
    //链式写法
    $('#dt div').eq(num).css('display', 'block').siblings().css('display',
        'none');
	
	var neirong=$('#dt div').eq(num).text().replace(/\s/g,"");
	var sz=120;
	
	// console.log(neirong);
	
	$("#aeaatwoxmsjzt1").text(neirong);
	// $("#nr2threeztsz").html(120);
	
	// var hx=$("#nr2threeztsz").text(sz);
	// console.log(sz);
	
    index++;
    if (index == $('#dt div').length) { //最后一张
        index = 0; //第一张
    }
}
var index = 0;
var timer; //定时器
//定时器 播放
function start() {
    timer = setInterval('changImg("auto")', 2500);
}
//鼠标离开之后 又要自动播放
// function reStart(num) {
//     index = num;
//     changImg(num);
//     start();
// }