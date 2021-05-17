var MyMarhq = '';
clearInterval(MyMarhq);
$('.tbl-body tbody').empty();
$('.tbl-header tbody').empty();
var str = '';
var Items = [{"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"},
    {"bumen":"不动产窗口","shuliang1":"1000","shuliang2":"1000"}]
$.each(Items,function (i, item) {
    str = '<tr>'+
        '<td class="nr2onez2s1">'+item.bumen+'</td>'+
        '<td class="nr2onez2s2">'+item.shuliang1+'</td>'+
        '<td class="nr2onez2s3">'+item.shuliang2+'</td>'+
        '</tr>'

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