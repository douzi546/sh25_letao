/**
 * Created by Administrator on 2019/8/19.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 4;

    var key =  getSearch("key");
    $(".search_input").val(key);
    //render();
    //
    //
    function render(callback){
        //$(".lt_product").html('<div class="loading"></div>');
        var parmas = {};
        parmas.proName = $(".search_input").val();
        parmas.page = currentPage;
        parmas.pageSize = pageSize ;

        var $current = $(".lt_sort a.current");
        if($current.length > 0){
            var sortName = $current.data('type');
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
        }
        parmas[sortName] = sortValue;


        setTimeout(function(){
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                data:parmas,
                dataType:"json",
                success:function(info){
                    console.log(info);
                    callback && callback(info);
                }
            })
        },600);
    //
    }

    $(".search-btn").click(function(){
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        key = $(".search_input").val();
        if(key === ""){
            mui.toast('请输入搜索关键字',{ duration:'long', type:'div' })
            return;
        }
        var history = localStorage.getItem("search_list");
        var arr = JSON.parse(history);
        var index = arr.indexOf(key);
        if(index != -1){
            arr.splice(index,1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem("search_list",JSON.stringify(arr));
    })


    $(".lt_sort a[data-type]").on("tap",function(){
        if($(this).hasClass("current")){
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }
        else{
            $(this).addClass("current").siblings().removeClass("current");
        }
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading()
    })

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto:true,
                callback :function(){
                    currentPage = 1;
                    render(function(info){
                        var htmlStr = template("productTpl",info);
                        $(".lt_product").html(htmlStr);
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            //mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();

                    });
                }
            },
            up : {
                auto:false,
                callback :function(){
                    console.log("上拉加载")
                    currentPage++;
                    render(function(info){
                        var htmlStr = template("productTpl",info);
                        $(".lt_product").append(htmlStr);
                        if ( info.data.length === 0 ) {
                            // 没有更多数据了, 显示提示语句
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(true);
                            setTimeout(function () {
                                mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            }, 1000);
                        }
                        else {
                            // 还有数据, 正常结束上拉加载
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh( false );
                        }
                    });

                }
            }
        }
    });

    $(".lt_product").on("tap","a",function(){
        var productId = $(this).data("id");
        location.href = "product.html?productId=" + productId;
    })











})



