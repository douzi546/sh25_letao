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
        $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID")
    });

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            picList.unshift(data.result);

            $('#imgBox').prepend('<img src="'+ data.result.picAddr +'" width="100">');

            if( picList.length > 3 ){
                picList.pop();
                $("#imgBox img:last-of-type").remove();
            }
            if(picList.length == 3){
                $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");

            }

        }
    });

    $("#form").bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }

    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        var pramsStr = $("#form").serialize();
        var str = "";
        $.each(picList,function(i,v){
            str += "&picName"+ ( i+1 )+"="+v.picName+"&picAddr"+( i+1 )+"="+ v.picAddr;
        });
        pramsStr += str;

        $.ajax({
            type:"post",
            url:"/product/addProduct",
            typeData:"json",
            data:pramsStr,
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#productModal").modal("hide");
                    currentPage = 1;
                    render();
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $(".dropdownText").text("请选择二级分类");
                    $('#imgBox img').remove();
                    picList = [];
                }
            }
        })
    });
})