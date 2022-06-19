Java.perform(function(){
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }
//    function byteToString(arr) {
//        if(typeof arr === 'string') {
//            return arr;
//        }
//        var str = '',
//            _arr = arr;
//        for(var i = 0; i < _arr.length; i++) {
//            var one = _arr[i].toString(2),
//                v = one.match(/^1+?(?=0)/);
//            if(v && one.length == 8) {
//                var bytesLength = v[0].length;
//                var store = _arr[i].toString(2).slice(7 - bytesLength);
//                for(var st = 1; st < bytesLength; st++) {
//                    store += _arr[st + i].toString(2).slice(2);
//                }
//                str += String.fromCharCode(parseInt(store, 2));
//                i += bytesLength - 1;
//            } else {
//                str += String.fromCharCode(_arr[i]);
//            }
//        }
//        return str;
//    }
//
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
//    MegActionLiveDetector.getActionCurrentStep.overload('long').implementation = function(long_a){
//        var step = this.getActionCurrentStep(long_a)
//        console.log("step = "+step)
//        return step
//    }
//    var JavaString =Java.use("java.lang.String");
//    var ActionDetectModeImpl = Java.use("com.megvii.meglive_sdk.detect.action.ActionDetectModeImpl")
//    ActionDetectModeImpl.a.overload('[B', 'int', 'int', 'int').implementation = function(p1,p2,p3,p4){
//        var str = 'result is: ' + byteToString(p1);
//        console.log("p1_ = "+str)
//        console.log("p2_ = "+p2)
//        console.log("p3_ = "+p3)
//        console.log("p4_ = "+p4)
//        var result = this.a(p1,p2,p3,p4)
////        console.log("a_return_ = -->"+result+"<--")
//        showStacks()
//        return result
//    }

    var ActionDetect = Java.use("android.hardware.Camera")
    ActionDetect.onPreviewFrame.overload().implementation = function(p1,p2){
        console.log("1")
        return this.onPreviewFrame(p1,p2)
    }
});