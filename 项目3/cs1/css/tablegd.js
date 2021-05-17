var MyMarhq = '';
clearInterval(MyMarhq);
$('.tbl-body tbody').empty();
$('.tbl-header tbody').empty();
var str = '';
var Items = [
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	{"bumen":"不动产窗口","shoujianliang":"1000","jiebanliang":"1000",},
	]
$.each(Items,function (i, item) {
    str = "<div"+" class="+"'nr2onez1'"+">"+
        '<span>'+item.bumen+'</span>'+
        '<span>'+item.shoujianliang+'</span>'+
        '<span>'+item.jiebanliang+'</span>'+
        '</div>'

    $('.tbl-body tbody').append(str);
    $('.tbl-header tbody').append(str);
});

if(Items.length > 10){
    $('.tbl-body tbody').html($('.tbl-body tbody').html()+$('.tbl-body tbody').html());
    $('.tbl-body').css('top', '0');
    var tblTop = 0;
    var speedhq = 50; // 数值越大越慢
    var outerHeight = $('.tbl-body tbody').find("tr").outerHeight();
    function Marqueehq(){
        if(tblTop <= -outerHeight*Items.length){
            tblTop = 0;
        } else {
            tblTop -= 1;
        }
        $('.tbl-body').css('top', tblTop+'px');
    }

    MyMarhq = setInterval(Marqueehq,speedhq);

    // 鼠标移上去取消事件
    $(".tbl-header tbody").hover(function (){
        clearInterval(MyMarhq);
    },function (){
        clearInterval(MyMarhq);
        MyMarhq = setInterval(Marqueehq,speedhq);
    })

}