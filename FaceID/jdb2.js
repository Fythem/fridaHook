Java.perform(function(){
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }
    var outputBytes = function(content){
        var b = Java.array('byte',content)
        var q = new Uint8Array(b.length)
        //console.log(b.length)
        for(var i=0;i<b.length;i++){
            //console.log((b[i]&0xFF).toString(16))
            q[i] =  b[i]&0xFF
        }
        return q
//        console.log(q)
    }


//    //PhoneFingerManager
//    var PhoneFingerManager = Java.use("com.megvii.apo.PhoneFingerManager")
//    PhoneFingerManager.xx.overload().implementation=function(){
//        var xxxx = this.xx()
//        console.log("xxxxxxxxxxxxx--->>>"+xxxx.length)
//        return xxxx
//    }

    var ActionDetectModeImpl = Java.use("com.megvii.meglive_sdk.detect.action.ActionDetectModeImpl")
    ActionDetectModeImpl.a.overload('java.lang.String', 'boolean', 'java.lang.String', 'java.lang.String').implementation = function(string_b, boolean_c, string_d, string_e){
        console.log("p1 = "+string_b)
        console.log("p2 = "+boolean_c)
        console.log("p3 = "+string_d)
        console.log("p4 = "+string_e)
        var result = this.a(string_b, boolean_c, string_d, string_e)
        console.log("a_return = -->"+result+"<--")
        return result
    }

//    //调用native参数，计算delta参数
//    var MegActionLiveDetector = Java.use("com.megvii.action.fmp.liveness.lib.jni.MegActionLiveDetector")
//    MegActionLiveDetector.getActionDeltaInfo.implementation = function(long_a, string_b, boolean_c, string_d, string_e){
//        console.log("+++++++getActionDeltaInfo start++++++++")
//        console.log("p1 = "+long_a)
//        console.log("p2 = "+string_b)
//        console.log("p3 = "+boolean_c)
//        console.log("p4 = "+string_d)
//        console.log("p5 = "+string_e)
//        console.log("+++++++getActionDeltaInfo end++++++++")
//        var result = this.getActionDeltaInfo(long_a, string_b, boolean_c, string_d, string_e)
//        console.log("result = "+result)  //result的Base64编码为请求中的 encryptData
//        return result
//    }
//
//    var eee = Java.use("com.megvii.meglive_sdk.d.e")
//    eee.a.overload('int', 'java.lang.String', 'java.lang.String').implementation = function(int_1, string_2, string_3){
//        console.log("p1 = "+int_1)
//        console.log("p2 = "+string_2)
//        console.log("p3 = "+string_3)
//        this.a(int_1, string_2, string_3)
//    }
    var JString = Java.use("java.lang.String");

    ActionDetectModeImpl.a.overload('[B', 'int', 'int', 'int').implementation = function(a,b,c,d){
        var xixi = JString.$new(a)
        console.log(a.decode('utf-8'));
//        console.log("a = "+a)
//        console.log("b = "+b)
//        console.log("c = "+c)
//        console.log("d = "+d)
//        return this.a(a,b,c,d)
    }

//    var ll = Java.use("com.megvii.meglive_sdk.f.m")
//    ll.a.overload('java.lang.String', 'java.lang.String').implementation = function(string_1, string_2){
//        console.log("   pp1 = "+string_1)
//        console.log("   pp2 = "+string_2)
//        return this.a(string_1,string_2)
//    }

//    var ByteString = Java.use("com.android.okhttp.okio.ByteString");
//    var MegActionLiveDetector = Java.use("com.megvii.action.fmp.liveness.lib.jni.MegActionLiveDetector")
//    MegActionLiveDetector.nativeActionLiveDetect.implementation = function(long_a, byte_b, int_c, int_d, int_e){
//        console.log("+++++++nativeActionLiveDetect start++++++++")
//        console.log("p1 = "+long_a)
//        console.log("p2 = "+ByteString.of(byte_b))
//        console.log("p3 = "+int_c)
//        console.log("p4 = "+int_d)
//        console.log("p5 = "+int_e)
//        console.log("+++++++nativeActionLiveDetect end++++++++")
//        this.nativeActionLiveDetect(long_a, byte_b, int_c, int_d, int_e)
//    }

    var fyfy = Java.use("com.megvii.action.fmp.liveness.lib.c.a")
    fyfy.toString.overload().implementation = function(){
        var str = this.toString()
//        console.log(str)
        return str
    }
});