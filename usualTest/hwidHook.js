Java.perform(function () {
    send("----do hwidHook----");

    var WebViewActivity = Java.use("com.huawei.sns.ui.browser.WebViewActivity");
    WebViewActivity.onCreate.overload('android.os.Bundle').implementation = function(p1_str){
        send("hooked WebViewActivity");
        this.onCreate(p1_str);
    }
});