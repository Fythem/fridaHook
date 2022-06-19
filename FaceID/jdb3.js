Java.perform(function(){
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }

    var DetectCallback = Java.use("com.rrh.jdb.modules.facecheck.kuangshi.a")
    DetectCallback.onDetectFinish.overload('java.lang.String', 'int', 'java.lang.String', 'java.lang.String').implementation = function(p1,p2,p3,p4){
        console.log("p1 = "+p1)
        console.log("p2 = "+p2)
        console.log("p3 = "+p3)
        console.log("p4 = "+p4)
        this.onDetectFinish(p1,p2,p3,p4)
    }
    var Base64Utils = Java.use("com.rrx.utils.encrypt.Base64Utils")
    Base64Utils.encodeToBase64String.overload('[B').implementation = function(p1){
        var a = this.encodeToBase64String(p1) //传入值为onDetectFinish中的第四个参数
        console.log("->"+a)
//        showStacks()
        return a
    }
    var haha = Java.use("com.megvii.meglive_sdk.detect.action.ActionLivenessActivity$1")
    haha.handleMessage.implementation = function(p1){
        console.log(p1+"@@@@"+p1.getData())
        this.handleMessage(p1)
    }
    var afca = Java.use("com.megvii.meglive_sdk.volley.a.f.c")
    afca.a.overload('java.lang.CharSequence').implementation = function(p1){
        var res = this.a(p1)
        console.log("========")
        console.log(res+"|"+p1)
        showStacks()
        console.log("========")
        return res
    }
    var ActionLivenessActivity = Java.use("com.megvii.meglive_sdk.detect.action.ActionLivenessActivity")
    ActionLivenessActivity.b.overload("com.megvii.meglive_sdk.detect.action.ActionLivenessActivity", "int", "int").implementation = function(p1,p2,p3){
        console.log("!!!!!!!!!!!!!")
        console.log("p1 = "+p1)
        console.log("p2 = "+p2)
        console.log("p3 = "+p3)
        console.log("!!!!!!!!!!!!!")
        return this.b(p1,p2,p3)
    }
    var ActionDetectModeImpl = Java.use("com.megvii.meglive_sdk.detect.action.ActionDetectModeImpl")
    ActionDetectModeImpl.a.overload('java.lang.String', 'boolean', 'java.lang.String', 'java.lang.String').implementation = function(string_b, boolean_c, string_d, string_e){
        console.log("p1_ = "+string_b)
        console.log("p2_ = "+boolean_c)
        console.log("p3_ = "+string_d)
        console.log("p4_ = "+string_e)
        var result = this.a(string_b, boolean_c, string_d, string_e)
        console.log("a_return_ = -->"+result+"<--")
        showStacks()
        return result
    }
//    //调用native参数，计算delta参数
    var MegActionLiveDetector = Java.use("com.megvii.action.fmp.liveness.lib.jni.MegActionLiveDetector")
    MegActionLiveDetector.getActionDeltaInfo.implementation = function(long_a, string_b, boolean_c, string_d, string_e){
        console.log("+++++++getActionDeltaInfo start++++++++")
        console.log("p1 = "+long_a)
        console.log("p2 = "+string_b)
        console.log("p3 = "+boolean_c)
        console.log("p4 = "+string_d)
        console.log("p5 = "+string_e)
        console.log("+++++++getActionDeltaInfo end++++++++")
        var result = this.getActionDeltaInfo(long_a, string_b, boolean_c, string_d, string_e)
        console.log("result = "+result)  //result的Base64编码为请求中的 encryptData
        return result
    }
//    var m = Java.use("com.megvii.meglive_sdk.f.m")
//    m.a.overload('java.lang.String', 'java.lang.String').implementation = function(string_1, string_2){
//        console.log("[log_A] "+string_1+" ==== "+string_2)
//        return this.a(string_1, string_2)
//    }
//    m.b.overload('java.lang.String', 'java.lang.String').implementation = function(string_1, string_2){
//        console.log("[log_B] "+string_1+" ==== "+string_2)
//        return this.b(string_1, string_2)
//    }
//    m.c.overload('java.lang.String', 'java.lang.String').implementation = function(string_1, string_2){
//        console.log("[log_C] "+string_1+" ==== "+string_2)
//        return this.c(string_1, string_2)
//    }
});