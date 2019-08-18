/**
 * Created by Administrator on 2019/8/18.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr = template("leftTpl",info);
            $(".lt_category_left ul").html(htmlStr);

            renderSecondById(1);
        }
    })

    $(".lt_category_left").on("click","a",function(){
        $(this).addClass("current").parent().siblings().children("a").removeClass('current');
        var id = $(this).data("id");
        renderSecondById(id);
    })

    function renderSecondById( id ){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("rightTpl",info);
                $(".lt_category_right ul").html(htmlStr);
            }
        })
    }
})