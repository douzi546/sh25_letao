/**
 * Created by Administrator on 2019/8/18.
 */
$(function(){
    //var arr = ["耐克","阿迪","新百伦","哥伦比亚","匡威"];
    //localStorage.setItem('search_list',JSON.stringify(arr));

    render();

    function getHistory(){
        var history = localStorage.getItem("search_list")||"[]" ;
        var arr = JSON.parse(history);
        return arr;
    }

    function render(){
        var arr = getHistory();
        var htmlStr = template("historyTpl",{arr:arr});
        $(".lt_history").html(htmlStr);
    }

    $(".lt_history").on("click",".btn-del",function(){
        mui.confirm("你确定要清空历史记录吗","温馨提示",["取消","确认"],function(e){
            if(e.index === 1){
                localStorage.removeItem('search_list');
                render();
            }
        })
    })

    $(".lt_history").on("click",".btn-del-one",function(){
        var that = this;
        mui.confirm("你确定要删除该条记录吗？","温馨提示",["取消","确认"],function(e){
            if(e.index === 1){
                var index = $(that).data("index");
                var arr = getHistory();
                arr.splice(index,1);
                var strJson = JSON.stringify( arr );
                localStorage.setItem("search_list",strJson);
                render();
            }
        })




    })

    $(".search-btn").click(function(){
        var key = $(".search_input").val().trim();
        if(key === ""){
            alert("请输入搜索关键词");
            return;
        }
        var arr =  getHistory();
        var index = arr.indexOf(key);
        if(index != -1){
            arr.splice(index,1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem("search_list",JSON.stringify( arr ));
        render();
        $(".search_input").val("");

    })








})