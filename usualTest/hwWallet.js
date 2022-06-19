Java.perform(function () {

//打印调用栈
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }
    send("----do hwWallet hook----");

     var LicenseCommonUtil=Java.use("com.huawei.wallet.util.LicenseCommonUtil");
     LicenseCommonUtil.ॱ.overload().implementation=function(){
        send("hooked LogUtil.ॱ() , and return "+this.ॱ());
        return true;
    }

});