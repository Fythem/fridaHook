Java.perform(function () {

//byte[] to String
    function byte2string(array){
        var result = "";
        array = new Uint8Array(array);
        for(var i = 0; i < array.length; ++i){
            result+= (String.fromCharCode(array[i]));
        }
        return result;
    }
//byte[] to HexString
    function byteToHexString(uint8arr) {
        if (!uint8arr) {
          return '';
        }
        var hexStr = '';
        for (var i = 0; i < uint8arr.length; i++) {
          var hex = (uint8arr[i] & 0xff).toString(16);
          hex = (hex.length === 1) ? '0' + hex : hex;
          hexStr += hex;
        }
        return hexStr.toUpperCase();
    }
//打印调用栈
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }
    //遍历所有类和方法
    function outDescJavaClass(className) {
         var jClass = Java.use(className);
            console.log(JSON.stringify({
              _name: className,
              _methods: Object.getOwnPropertyNames(jClass.__proto__).filter(function(m) {
                return !m.startsWith('$') // filter out Frida related special properties
                  || m == 'class' || m == 'constructor' // optional
              }),
              _fields: jClass.class.getDeclaredFields().map(function(f) {
                return f.toString();
              })
          }, null, 2));
   }

    var ag = Java.use("com.google.android.apps.gsa.search.core.google.a.ag");
    console.log("--ready newhook--");

    var ab = Java.use('com.google.protobuf.ab');
//    ab.$init.overload('[B').implementation=function(byte1){
//        send("@@@@@@@@@@@"+byte2string(byte1));
//        return this.$init(byte1);
//    }
//    ag.a.overload("com.google.android.apps.gsa.shared.search.Query").implementation=function(query){
//        send("hooked ag.a() query = "+query);
//        showStacks();
//        return this.a(query);
//    };

    ag.a.overload("com.google.android.apps.gsa.shared.search.Query").implementation=function(query){
        send("hooked ag.a() query = "+query);
        ab.$init.implementation=function(byteArray){
           var bArray = byte2string(byteArray)
           if(bArray.indexOf("151211")!=-1){
               send("Hex_array = "+byteToHexString(byteArray));
//               showStacks();
           }
           return this.$init(byteArray);
        };
        return this.a(query);
    };

    ag.a.overload("com.google.android.apps.gsa.contacts.bg","int").implementation=function(p1_bg,p2_int){
        send("ag.a(bg, int), int = "+p2_int);
        return this.a(p1_bg,p2_int);
    }



        var arg = Java.use("com.google.android.apps.gsa.search.core.google.cl");
        arg.a.overload("int","java.lang.String").implementation=function(ppp1,ppp2){
            send("####"+ppp1+"####"+ppp2);
            var rstr = this.a(ppp1,ppp2);
            send("####return = "+rstr);
            return rstr;
        };

});