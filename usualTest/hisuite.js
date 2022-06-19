Java.perform(function () {

//打印调用栈
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }
    send("----do hisuiteHook----");

    var y = Java.use("com.huawei.hisuite.y")
    y.run.implementation = function(){
        send("hooked hisuite socket run");
        showStacks();
        this.run();
    }

    var w = Java.use("com.huawei.hisuite.w");
    w.a.implementation=function(){
        send("hooked read command");
        this.a();
    }

    var s = Java.use("com.huawei.hisuite.HiSuiteService");
    s.a.overload("int").implementation=function(p1){
        send("hooked service.a(), p1_port = "+p1);
        showStacks();
        this.a(p1);
    }
    s.onCreate.implementation=function(){
        send("hooked service.onCreate");
        showStacks();
        this.onCreate();
    }
    s.onStartCommand.implementation=function(p1,p2,p3){
        send("hooked service.onStartCommand");
        send("param = "+p1+"///"+p2+"///"+p3);
        showStacks();
        return this.onStartCommand(p1,p2,p3);
    }

    var ap = Java.use("com.huawei.hisuite.utils.ap");
    ap.a.overload("java.lang.String", "int").implementation=function(p1,p2){
        send("hook SecureIntent.a(), p1 = "+p1+"|p2 = "+p2);
        return this.a(p1,p2);
    }


    var ConnectActivity = Java.use("com.huawei.hisuite.activity.ConnectActivity");
    ConnectActivity.a.overload("java.lang.String").implementation=function(p1){
        send("hook .a(), auth_code = "+p1);
        showStacks();
        return this.a(p1);
    }


    var aq = Java.use("com.huawei.hisuite.utils.aq");
    aq.c.overload().implementation=function(){
        var isUsbConnected = this.c();
        send("isUsbConnected "+ isUsbConnected);
        return isUsbConnected;
    }
});