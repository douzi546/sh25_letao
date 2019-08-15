/**
 * Created by Administrator on 2019/8/14.
 */
$( document ).ajaxStart(function() {
    NProgress.start();
});

$( document ).ajaxStop(function() {
    setTimeout(function(){
        NProgress.done();
    },500)

});

if(location.href.indexOf("login.html") === -1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            if(info.error === 400){
                location.href = "login.html"
            }
        }
    })

}
$(function(){
    $(".category").click(function(){
        $(".child").stop().slideToggle();
    });


    $(".icon_menu").click(function(){
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");

    });


    $(".icon_logout").click(function(){
        $("#myModal").modal('show');
    });

    $(".btn-logout").click(function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href = "login.html"
                }
            }
        })
    })


})