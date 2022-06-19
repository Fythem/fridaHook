Java.perform(function () {

//打印调用栈
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }
    send("----do lanxin hook----");

    var CommonWebViewActivity=Java.use("com.lite.lanxin.jssdk.web.CommonWebViewActivity");
    CommonWebViewActivity.YQ.implementation=function(){
        send("hooked CommonWebViewActivity.YQ()");
        this.YQ();
    }

    CommonWebViewActivity.checkForceHideMenu.implementation=function(p1){
        send("hooked checkForceHideMenu => "+p1);
        showStacks();
        this.checkForceHideMenu(p1);
    }

    CommonWebViewActivity.asr.implementation=function(){
        send("hook asr()");
        return this.asr();
    }

    var CordovaBridge = Java.use("org.apache.cordova.CordovaBridge");
    CordovaBridge.jsExec.implementation=function(p1,p2,p3,p4,p5){
        send("params: "+p1+"--"+p2+"--"+p3+"--"+p4+"--"+p5);
        var reSult = this.jsExec(p1,p2,p3,p4,p5);
        return reSult
    }



//加载的js？
//    var BridgeWebView=Java.use("com.github.lzyzsd.jsbridge.BridgeWebView");
//    BridgeWebView.a.overload("java.lang.String","com.github.lzyzsd.jsbridge.BridgeHandler").implementation=function(p1,p2){
//        send("hooked BridgeWebView , and p1: "+p1);
//        this.a(p1,p2);
//    }
    var Logger=Java.use("com.lite.lanxin.logger.Logger");
    Logger.getLogLevel.implementation=function(){
//        send("hooked SwipeBackActivity.onCreate() , and p1: "+p1);
        return 1;
    }

//    var FloatingViewLifecycleCallback=Java.use("com.tianji.mtp.sdk.activity.FloatingViewLifecycleCallback");
//    FloatingViewLifecycleCallback.showBundle.implementation=function(p1){
//        send("hooked SwipeBackActivity.showBundle() , and p1: "+p1);
//        showStacks();
//        this.showBundle(p1);
//    }

Interceptor.attach(Module.getExportByName("libc.so", 'connect'), {
    onEnter: function(args) {
        send("connect----")
        //send("arg[0] = "+args[0])
        //send("arg[1] = "+args[1])
        var addLen = args[2]
        //send("addLen = "+addLen+"-->"+new Int64(addLen.toString()));
        send('connect', Memory.readByteArray(args[1], new Int64(addLen.toString())))
    }
});
});