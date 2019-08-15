/**
 * Created by Administrator on 2019/8/15.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var currentId ;
    var currentDel;

    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                console.log(info);
                var htmlStr = template("tpl",info);
                $("tbody").html(htmlStr);

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total / info.size) ,//总页数
                    onPageClicked:function(event, originalEvent, type, page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })

    }
    render();

    $("tbody").on("click",".btn",function(){
        $("#btnModal").modal("show");
        currentId = $(this).parent().data("id");
        currentDel = $(this).hasClass("btn-success") ? 1 : 0 ;

    })

    $(".btn-status").on("click",function(){
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:currentId,
                isDelete:currentDel,
            },
            typeData:"json",
            success:function(info){
                if(info.success){
                    $("#btnModal").modal("hide");
                    render();
                }
            }
        })


    })


})
