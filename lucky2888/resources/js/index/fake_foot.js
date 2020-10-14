$(function () {
function showNotice(notice_id) {
    $(".popNewsLayer").hide();
    $("#notice_info_" + notice_id).show();
    $("#notice_infoa_" + notice_id).css({'border-right': '2px solid red'});
    var i = layer.open({
        type: 1,
        title: '最新公告',
        skin: 'layui-layer-rim newsbg',
        shade: [0.7, '#000'],
        style: 'background-color',
        offset: ['50px', ''],
        area: ['850px', '500px'],
        content: $('#layer_containerMore'),       //.html(),
        success: function (dom, index) {
            $(".ShowNews").click(function () {
                $(".popNewsLayer").hide();
                $(".MainListUl_More >ul >li").css({'border-right': '2px solid white'});
                var notice_id = $(this).attr('notice_id');

                $("#notice_info_" + notice_id).show();
                $("#notice_infoa_" + notice_id).css({'border-right': '2px solid red'});
            });
            $(".MainListUl_More a").eq(0).click();
        }

    });
}
var flag;
setInterval(function () {
    if (flag) {
        $('.hot').css({'display': 'block'});
        $('.hot1').css({'display': 'block'})
    } else {
        $('.hot1').css({'display': 'block'});
        $('.hot').css({'display': 'block'})
    }
    flag = !flag;
}, 100);
/****************公告滚动begin***************/
function ScrollImgLeft() {
    var speed = 30;
    var MyMar = null;
    var scroll_begin = document.getElementById("NewSl_begin");
    var scroll_end = document.getElementById("NewSl_end");
    var scroll_div = document.getElementById("NewSl");
    scroll_end.innerHTML = scroll_begin.innerHTML;
    function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
            scroll_div.scrollLeft -= scroll_begin.offsetWidth;
        else
            scroll_div.scrollLeft++;
    }

    MyMar = setInterval(Marquee, speed);
    scroll_div.onmouseover = function () {
        clearInterval(MyMar);
    }
    scroll_div.onmouseout = function () {
        MyMar = setInterval(Marquee, speed);
    }
}

ScrollImgLeft();

/****************公告滚动end***************/

//最新公告弹出层
$(".ShowNewsMore").live("click", function () {
    var notice_id = $(this).attr('notice_id');
    showNotice(notice_id);
});
});
