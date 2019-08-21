/**
 * Created by Administrator on 2019/8/20.
 */
$(function(){
    function render(){
        setTimeout(function(){
            $.ajax({
                type:"get",
                url:"/cart/queryCart",
                dataType:"json",
                success:function(info){
                    console.log(info);
                    if ( info.error === 400 ) {
                        // 用户没登陆, 跳转到登录页, 在跳转时, 将页面地址拼接
                        location.href = "login.html?retUrl=" + location.href;
                        return;
                    }
                    var htmlStr = template("cartTpl",{arr:info});
                    $(".mui-table-view").html(htmlStr);
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                }
            })
        },500)
    }

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto:true,
                callback :function(){
                    render();
                }
            }
        }
    });


    $(".mui-table-view").on("tap",".btn_del",function(){
        var id = $(this).data("id");
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            data:{id:[id]},
            dataType:"json",
            success:function(info){
                if(info.success){
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }
            }
        })
    })

    $(".mui-table-view").on("tap",".btn_edit",function(){
        var obj = this.dataset;
        console.log(obj);

        var htmlStr = template("editTpl",obj);
        htmlStr = htmlStr.replace( /\n/g, "" );
        mui.confirm(htmlStr,"温馨提示",["确认","取消"],function(e){
            if(e.index === 0){
                var size = $(".lt_size span.current").text();
                var num = $(".mui-numbox-input").val();
                var id = obj.id;
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    dataType:"json",
                    success:function(info){
                        console.log(info);
                        if(info.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }

                })

            }
        });
        mui(".mui-numbox").numbox();

    })

    $("body").on("tap",".lt_size span",function(){
        $(this).addClass("current").siblings().removeClass("current");

    });
})