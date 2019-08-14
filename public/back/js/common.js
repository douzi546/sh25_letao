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