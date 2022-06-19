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

    var clazz = Java.use('java.lang.Class');
    var Field = Java.use("java.lang.reflect.Field");


    function getFieldByReflect(obj, fieldName){
        var JClass = Java.cast(obj.getClass(), clazz);
        var fieldo = Java.cast(JClass.getField(fieldName), Field);
        return fieldo.get(obj);
    }

    var ab = Java.use('com.google.protobuf.ab');
    var ag = Java.use("com.google.android.apps.gsa.search.core.google.a.ag");

    console.log("--ready hook--");

    ag.a.overload("com.google.android.apps.gsa.shared.search.Query").implementation=function(query){
        send("hooked ag.a() query = "+query);
        ab.$init.implementation=function(byteArray){
           var bArray = byte2string(byteArray)
           if(bArray.indexOf("151211")!=-1){
               send("array = "+bArray);
               showStacks();
           }
           return this.$init(byteArray);
           var aba_before = ab.a;
           send("ab.a byte[] = "+byte2string(aba_before));
        };
        return this.a(query);
    };
    ag.a.overload("com.google.android.apps.gsa.contacts.bg","int").implementation=function(p1_bg,p2_int){
        send("ag.a(bg, int), int = "+p2_int);
        return this.a(p1_bg,p2_int);
    }

    //hook com.google.protobuf.cr
    var cr = Java.use("com.google.protobuf.cr");
//    cr.$init.implementation=function(){
//        var alparambyte = byte2string(cr.b);
//        send("hooked cr.init()");
//        send("cr byte1 = "+alparambyte);
//        this.$init();
//    }

    function showZ_a(){
        var clazz = Java.use("java.lang.Class");
        var z = Java.use("com.google.protobuf.z");
//        var b = Java.cast(z.getClass(),clazz).getDeclaredField('b');
//        b.setAccessible(true);
//        var b_value = byte2string(b);
//        send("protobuf.z byte[] b = "+b_value);
        z.$init.implementation=function(param_int){
            var byteb = z.b;
            send("+++param int = "+param_int);
            send("+++"+byte2string(byteb).length);
            this.$init(param_int);
            send("---"+byte2string(byteb).length);
        }
    }

    //hook bx.mutableCopy
    var ar = Java.use("com.google.protobuf.ar");
    ar.a.overload("[B").implementation=function(p1_cq){
//        send("ar.a( = "+byte2string(p1_cq));
        return this.a(p1_cq);
    }


//hook com.google.protobuf.ee
//    var ee = Java.use("com.google.protobuf.ee");
//    ee.a.implementation = function(p1Class){
//        send("hooked ee(Class) "+p1Class.toString());
//        return this.a(p1Class);
//    }

    //hooked dv.a
//    var dv = Java.use("com.google.protobuf.dv");
//    dv.a.overload("java.lang.Object", "com.google.protobuf.as").implementation=function(p1, p2){
//        send();
//        showStacks();
//        var r = this.a(p1, p2)
//        console.log("hooked dv.a(Object, as)\np1="+p1.toString() + "\np2=" + p2.toString()+"\nr = " + r.toString());
//        return r;
//    }


//    var z = Java.use("com.google.protobuf.z");
//    z.a.implementation=function(){
//        var before = (this.b).toString();
//        send("before init, z.b = "+this.b);
//        var r = this.a();
//        var after = byte2string(this.b);
//        send("after init, z.b = "+after)
//        return r;
//    }

//      var bx = Java.use("com.google.protobuf.bx");
//    bx.writeTo.overload("com.google.protobuf.ar").implementation=function(p1){
//        send(this.getClass().getName());

//        var ee = Java.use("com.google.protobuf.ee");
//        var as = Java.use("com.google.protobuf.as");
//
//        var v0 = (new ee).a(this.getClass());  // v0_1.build().toByteString()中，实际执行的writeTo()
//        var v1 = p1.f;
//        if(v1 == null) {
//            v1 = as.$init(p1);
//        }
//
//        v0.a(this, v1);

//        send("hooked bx.writeTo");
//        showStacks();
//        this.writeTo(p1);
//    }

//        al.b.overload("[B","int","int").implementation=function(p1,p2,p3){
//            var byte = this.b;
//            send("before al.j()  byte[] = "+byte2string(byte));
//            this.b(p1,p2,p3);
//            send("after al.j()  byte[] = "+byte2string(byte));
//        }

    //hook ft！！！！！！！！
//    var al = Java.use("com.google.protobuf.al");
//    al.a.overload("int","java.lang.String").implementation=function(p1,p2){
//        send("al.a() p1_int = "+p1);
//        send("al.a() p2_String = "+p2);
//        showStacks();
//        var oldArray = this.b;
//        send("al.class 1111array = "+byte2string(oldArray));
//        this.a(p1,p2);
//        var newArray = this.b;
//        send("al.class 2222array = "+byte2string(newArray));
//
//    }

//    hook com.google.android.apps.gsa.contacts.bf
        var bf = Java.use("com.google.android.apps.gsa.contacts.bf");
        bf.d.overload().implementation=function(){
            send("hooked bf.d(), check contact_permission");
//            showStacks();
            this.d();
        }
//        bf.a.overload("int","java.util.List","boolean").implementation=function(p1_in,p2_list,p3_boo){
//            var lista = this.a(p1_in,p2_list,p3_boo);
//            send("hooked bf.a(int,list,boolean), \np1 = "+p1_in+"\np2_list = "+p2_list.toString()+"\np3 = "+p3_boo);
//
//            var strb = p2_list.get(0);
//            console.log(strb.getClass().getDeclaredFields()[0].getName());
//            console.log(strb.a);
//            send("p2.get(1).b = "+strb.b);
//            send("p2.get(1).c = "+strb.c);
//            send("p2.get(1).g = "+strb.g);
//            send("p2.get(1).h = "+strb.h);
//            return lista;
//        }
//        bf.a.overload("java.lang.String").implementation=function(str){
//            var tf =  this.a(str);
//            send(tf+"////bf.a(String) = "+str);
//            return tf;
//
//        }



        //输出log == log.class com.google.android.apps.gsa.shared.util.b.f
//        var f = Java.use("com.google.android.apps.gsa.shared.util.b.f");
//        f.a.overload("java.lang.String","java.lang.String","[Ljava.lang.Object;").implementation=function(p1,p2,p3){
//            if(p1.indexOf("LogsBasedTopContactLook") != -1){
//                send("log = "+p1+"///"+p2+"///"+p3.toString());
//            }
//            this.a(p1,p2,p3);
//        }





//com.google.android.apps.gsa.staticplugins.af.b检查上传时机？
//    var b = Java.use("com.google.android.apps.gsa.staticplugins.af.c");
//    b.a.overload("com.google.android.apps.gsa.tasks.aj").implementation = function(p1_aj){
//        send("hooked af.c.a() check update time");
//        this.a(p1_aj);
//    }



//    var bl = Java.use("com.google.android.apps.gsa.contacts.bl");
//    bl.a.overload("com.google.android.apps.gsa.search.core.ax", "com.google.android.apps.gsa.search.core.i.l").implementation=function(p1_ax,p2_l){
//        send("hooked bl.a()");
//        return this.a(p1_ax,p2_l);
//    }


//    var bg = Java.use("com.google.android.apps.gsa.contacts.bg");
//    bg.b.overload("com.google.android.apps.gsa.contacts.bi","int").implementation=function(p1_bi,p2_in){
//        send("hooked bg.b()");
//        var r = this.b(p1_bi,p2_in)
//        send("bg.b() p2_int = "+p2_in+" return List = "+r.toString());
//        return r;
//    }

//    var f = Java.use("com.google.android.apps.gsa.shared.util.b.f");
//    f.a.overload("java.lang.String","[Ljava.lang.Object;").implementation=function(pp1,pp2){
//        var r_str = this.a(pp1,pp2);
//        send("get Log ---> "+r_str);
//        return r_str;
//    }

//        outDescJavaClass("com.google.android.apps.gsa.contacts.bf");


//        console.log( Object.getOwnPropertyNames(ab.__proto__).join("---") );




        var ABClass = Java.use("java.util.concurrent.atomic.AtomicBoolean");
//        ABClass.get.implementation=function(){
//            if(isAB == true){
////                isAB = false;
//                return false;
//            }
//            var getAB = this.get();
//            send("hooked AB.get() = "+getAB);
//            return getAB;
//        }



            //实际return ture
        bf.c.overload().implementation=function(){
            var c = this.c();

//                var ab = Java.choose("java.util.concurrent.atomic.AtomicBoolean",{
//                onMatch: function (instance){  },
//                onComplete: function() { console.log("[*] -----");}            });
//var ab = Java.choose('java.util.concurrent.atomic.AtomicBoolean',function(){});
//                console.log("-----"+ab);


//          this.D = new AtomicBoolean(true);

//        var hookClassCast = Java.cast(this.D, clazz)

//        var func = this.D.getClass().getDeclaredMethods();
//        console.log(func);
//        console.log("--------------------------GET Joseph Function---------------------------");

//            var hookClassCast = Java.cast(ab.getClass(),clazz)
//            hookClassCast.setAccessible(true);


//            console.log(func[0]);
//            var f = func[0];
//            var rtn1 = f.invoke(instance,numArr1);



//            ageid.setBoolean(this, false);
//            this.D.value = false;
//            this.D.getAndSet(false);
//            outDescJavaClass("java.util.concurrent.atomic.AtomicBoolean");
//            send("get bf.D = "+this.D.value);
//            outDescJavaClass("com.google.android.apps.gsa.contacts.bf");
//            showStacks();


            send("hooked bf.c(), return "+c);
            return c;
        }


        bf.a.overload().implementation=function(){
            send("quicksearch start read contact");
            this.a();
        }



        var contactag = Java.use("com.google.android.apps.gsa.contacts.ag");
            contactag.$init.implementation = function(){
            send("hook contactag init");
            this.$init();
        }

//Refreshing top contacts...未触发
        bf.e.implementation=function(){
            send("hooked bf.e");
            this.e();
        }


        bf.f.implementation=function(){
            send("hooked bf.f");
            this.f();
        }


//        var d = Java.use("com.google.android.apps.gsa.l.d");
//        d.c.implementation = function(){
//            send("hooked d.c(), return ds.class");
//            var ds = this.c();
//            var h_lang = ds.h;
//            send("ds.h = "+h_lang);
//            return ds;
//        }


        var am = Java.use("com.google.android.apps.gsa.contacts.am");
        var juL = Java.use("java.util.List");
        am.a.implementation = function(){
            var a = this.a();
            send("----hooked am.a()");
//            var listD = this.d;
            var dlist = Java.cast(a, juL);
            send("++++return List = "+dlist);

//???
//            var dddd = Java.cast(this.d, juL);
//            dddd.setAccessible(true);
//            send("+++++++++++++++am.d = "+dddd);

//            for(var i=0;i<listD.length;i++){
//                send("----am.D = "+listD[i]);
//
//            }
//            send("----am.D = "+dlist);
            showStacks();
            return a;
        }



        //hooked request
//        var c = Java.use("com.google.android.libraries.gsa.e.a.ao");
//        c.a.overload("java.lang.Object").implementation=function(cp1){
//            send("request = "+cp1.getClass());
//            return this.a(cp1);
//        }


        var d = Java.use("com.google.android.apps.gsa.staticplugins.i.d");
        d.a.overload("com.google.android.apps.gsa.shared.search.Query").implementation=function(cp1){
            send("@@@@@ = "+cp1);
            return this.a(cp1);
        }


        //生成的请求url的地方
        var arg = Java.use("com.google.android.apps.gsa.search.core.google.cl");
        arg.a.overload("int","java.lang.String").implementation=function(ppp1,ppp2){
            send("####"+ppp1+"####"+ppp2);
            var rstr = this.a(ppp1,ppp2);
            send("####return = "+rstr);
            return rstr;
        };
//        var rb = Java.use("org.chromium.net.ExperimentalUrlRequest$Builder");
//        rb.addHeader.overload("java.lang.String","java.lang.String").implementation=function(cp1,cp2){
//            send("|||request = "+cp1+"///"+cp2);
//            return this.addHeader(cp1,cp2);
//        }


//getList
    var jum = Java.use("java.util.Map");
    var av = Java.use("com.google.android.apps.gsa.search.core.google.av");
//    var JavaString =Java.use("[java.lang.String;");

//    var javaArray = Java.array("byte",[]);

//    send(av.a.toString());
    av.a.overload("java.util.Map","java.util.Map","java.util.Map").implementation=function(p1,p2,p3){
        var map2 = Java.cast(p2,jum);
        send("map = "+map2);
//        var yui = map2.get("X-Client-Data");
        showStacks();
//        var bbbb = Java.cast(yui,"[B;");
//                send("&&&&&"+bbbb.length());

//var str = 'result is: ' + JavaString.$new(yui);

//        send("*********"+bbbb);
        return this.a(p1,p2,p3);
    };



        var arg1 = Java.use("com.google.protobuf.bx");
        arg1.parseFrom.overload("com.google.protobuf.bx","[B","com.google.protobuf.bc").implementation=function(ppp1,ppp2,ppp3){
            send("+++"+byte2string(ppp2));
            var rstr = this.parseFrom(ppp1,ppp2,ppp3);
//            send("####return = "+rstr);
            return rstr;
        };


        var c = Java.use("com.google.android.apps.gsa.search.core.google.f.c");
        c.a.overload("java.util.Map","java.util.List").implementation=function(p1,p2){
            this.a(p1,p2);
            send("all param = "+p2);
        }

});