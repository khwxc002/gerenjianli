$(function() {
    init();
    changImg(); //解决第一次第一张到第二张的时间间隔
    start();
	$("#nr2threebt").text('九龙街道');
	$("#nr2threeztbh").text('1');
	$("#nr2threeztpxnr").text('九龙湖镇事件1');
	$("#nr2threezs1").width('100%');
	$("#nr2threeztsz").text('120');
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
		
	var divquan=$('#dt div').eq(num).find('#shijians').html();
	// console.log(divquan);
	var biaoti=$('#dt div').eq(num).find('#biaoti').text().replace(/\s/g,"");//提取标题
	
	var shijiansb1=$('#dt div').eq(num).find('#shijians').find('#shijiansb1').text().replace(/\s/g,"");
	var shijiansm1=$('#dt div').eq(num).find('#shijians').find('#shijiansm1').text().replace(/\s/g,"");
	var shijiansbf1=$('#dt div').eq(num).find('#shijians').find('#shijiansbf1').text().replace(/\s/g,"");
	var shijiansz1=$('#dt div').eq(num).find('#shijians').find('#shijiansz1').text().replace(/\s/g,"");
	
	// console.log(shijiansb1);
	// console.log(shijiansm1);
	// console.log(shijiansbf1);
	// console.log(shijiansz1);
	
	$("#nr2threebt").text(biaoti);
	$("#nr2threeztbh").text(shijiansb1);
	$("#nr2threeztpxnr").text(shijiansm1);
	$("#nr2threezs1").width(shijiansbf1+'%');
	$("#nr2threeztsz").text(shijiansz1);
	

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