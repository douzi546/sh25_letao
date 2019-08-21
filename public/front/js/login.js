/**
 * Created by Administrator on 2019/8/20.
 */
$(function(){
    $(".btn-login").on("tap",function(){
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();

        if(username == ""){
            mui.toast('请输入用户名')
        }
        if(password == ""){
            mui.toast('请输入密码')
        }

        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.error == 403){
                    mui.toast("用户名或密码错误");
                    return;
                }
                if(info.success){
                    var retUrl = location.search.replace("?retUrl=","");
                    if(retUrl.indexOf("productId") > -1){
                        location.href = retUrl;
                    }else{
                        location.href = 'user.html';
                    }
                }
            }
        })


    })
})