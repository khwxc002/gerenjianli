var MyMarhq = '';
clearInterval(MyMarhq);
$('.tbl-body tbody').empty();
$('.tbl-header tbody').empty();
var str = '';
var Items = [{"Ranking":"1","City":"保定","SaleIncome":"2506734.43"},
    {"Ranking":"2","City":"沧州","SaleIncome":"1425935.58"},
    {"Ranking":"3","City":"秦皇岛","SaleIncome":"1372207.38"},
    {"Ranking":"4","City":"衡水","SaleIncome":"972451.15"},
    {"Ranking":"5","City":"石家庄","SaleIncome":"939010.52"},
    {"Ranking":"6","City":"邢台","SaleIncome":"774274.70"},
    {"Ranking":"7","City":"唐山","SaleIncome":"680456.79"},
    {"Ranking":"8","City":"张家口","SaleIncome":"613319.87"},
    {"Ranking":"9","City":"中油华奥","SaleIncome":"596575.25"},
    {"Ranking":"10","City":"承德","SaleIncome":"589048.12"},
    {"Ranking":"11","City":"廊坊","SaleIncome":"515448.14"}]
$.each(Items,function (i, item) {
    str = '<tr>'+
        '<td>'+item.Ranking+'</td>'+
        '<td>'+item.City+'</td>'+
        '<td>'+(+item.SaleIncome/10000).toFixed(2)+'</td>'+
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