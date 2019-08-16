/**
 * Created by Administrator on 2019/8/16.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var picList = [];

    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                var htmlStr = template("tpl",info);
                $("tbody").html(htmlStr);


                $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total / info.size ),
                    itemTexts:function(type,page,current){
                        switch (type){
                            case "page" :
                                return page;
                            case "first" :
                                return "首页";
                            case "last" :
                                return "尾页";
                            case "prev" :
                                return "上一页";
                            case "next" :
                                return "下一页";
                        }
                    },
                    tooltipTitles:function(type,page,current){
                        switch (type){
                            case "page" :
                                return "前往第" + page + "页";
                            case "first" :
                                return "首页";
                            case "last" :
                                return "尾页";
                            case "prev" :
                                return "上一页";
                            case "next" :
                                return "下一页";
                        }
                    },
                    useBootstrapTooltip: true,
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }

                })
            }
        })
    }
    render();


    $("#btnproduct").click(function(){
        $("#productModal").modal("show");

        $.ajax({
            type:'get',
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){
                var htmlStr = template("tpl-modal",info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    $(".dropdown-menu").on("click","a",function(){
        $(".dropdownText").text($(this).text());
        $('[name="brandId"]').val($(this).data("id"));
    });

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            picList.unshift(data.result);
            console.log(picList);
            $('#imgBox').prepend('<img src="'+ data.result.picAddr +'" width="100">');

            if( picList.length > 3 ){
                picList.pop();
                $("#imgBox img:last-of-type").remove();
            }

        }
    });


})