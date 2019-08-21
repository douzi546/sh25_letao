/**
 * Created by Administrator on 2019/8/20.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        dataType:'json',
        success:function(info){
        console.log(info);
            if(info.error == 400){
                location.href = "login.html";
            };
            var htmlStr = template("userTpl",info);
            $(".mui-media").html(htmlStr);
        }
    })
    $("#logout").on("tap",function(){
        $.ajax({
            type:"get",
            url:"/user/logout",
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })
})