/**
 * Created by Administrator on 2019/8/19.
 */
$(function(){

    //var key =  getSearch("key");
    //$(".search_input").val(key);
    //render();
    //
    //
    //function render(){
    //    $(".lt_product").html('<div class="loading"></div>');
    //    var parmas = {};
    //    parmas.proName = $(".search_input").val();
    //    parmas.page = 1;
    //    parmas.pageSize = 100;
    //
    //    var $current = $(".lt_sort a.current");
    //    if($current.length > 0){
    //        var sortName = $current.data('type');
    //        var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
    //    }
    //    parmas[sortName] = sortValue;
    //
    //
    //    setTimeout(function(){
    //        $.ajax({
    //            type:"get",
    //            url:"/product/queryProduct",
    //            data:parmas,
    //            dataType:"json",
    //            success:function(info){
    //                var htmlStr = template("productTpl",info);
    //                $(".lt_product").html(htmlStr);
    //            }
    //        })
    //    },600)
    //
    //}
    //
    //$(".search-btn").click(function(){
    //    render();
    //    key = $(".search_input").val();
    //    if(key === ""){
    //        mui.toast('请输入搜索关键字',{ duration:'long', type:'div' })
    //        return;
    //    }
    //    var history = localStorage.getItem("search_list");
    //    var arr = JSON.parse(history);
    //    var index = arr.indexOf(key);
    //    if(index != -1){
    //        arr.splice(index,1);
    //    }
    //    if(arr.length >= 10){
    //        arr.pop();
    //    }
    //    arr.unshift(key);
    //    localStorage.setItem("search_list",JSON.stringify(arr));
    //})
    //
    //
    //$(".lt_sort a[data-type]").click(function(){
    //    if($(this).hasClass("current")){
    //        $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    //    }
    //    else{
    //        $(this).addClass("current").siblings().removeClass("current");
    //    }
    //    render();
    //})

    




})
