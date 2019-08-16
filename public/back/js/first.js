/**
 * Created by Administrator on 2019/8/16.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("tpl",info);
                $("tbody").html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total / info.size),
                    onPageClicked:function(event, originalEvent, type,page){
                        currentPage = page;
                        render();
                    }
                })



            }

        })
    }
    render();

    $("#btnFirst").click(function(){
        $("#firstModal").modal("show");
    });

    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名称"
                    }
                }
            }
        }
    })

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                if(info.success){
                    $("#firstModal").modal("hide");
                    currentPage = 1;
                    render();
                    $('#form').data("bootstrapValidator").resetForm( true );
                }
            }
        })
    });
})