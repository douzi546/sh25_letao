/**
 * Created by Administrator on 2019/8/16.
 */
$(function() {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("tpl", info);
                $('tbody').html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })

    }

    render();

    $("#btnSecond").click(function () {
        $("#SecondModal").modal("show");

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("tpl-add", info);
                $(".btn-group ul").html(htmlStr);
            }
        })
    });


    $(".form-group").on("click", "a", function () {
        var category_id = $(this).attr("category-id");
        $('[name="categoryId"]').val(category_id);
        $(".dropdownText").text($(this).text());

        $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID")
    })

    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            $("#img").attr("src", data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);

            $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID")
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
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }

    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑


        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                if(info.success){
                    $("#SecondModal").modal("hide");
                    currentPage = 1;
                    render();
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $(".dropdownText").text("请选择1级分类");

                    // 找到图片重置
                    $('.imgBox img').attr("src", "images/none.png");
                }
            }


        })
    });



})