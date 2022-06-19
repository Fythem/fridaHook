Java.perform(function () {

//打印调用栈
    function showStacks() {
        Java.perform(function () {
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
        });
    }
//dump so文件
    function dumpSo(so_name) {
        var currentApplication = Java.use("android.app.ActivityThread").currentApplication();
        var dir = currentApplication.getApplicationContext().getFilesDir().getPath();
        var libso = Process.getModuleByName(so_name);
        console.log("[name]:", libso.name);
        console.log("[base]:", libso.base);
        console.log("[size]:", ptr(libso.size));
        console.log("[path]:", libso.path);
        var file_path = dir + "/" + libso.name + "_" + libso.base + "_" + ptr(libso.size) + ".so";
        var file_handle = new File(file_path, "wb");
        if (file_handle && file_handle != null) {
            Memory.protect(ptr(libso.base), libso.size, 'rwx');
            var libso_buffer = ptr(libso.base).readByteArray(libso.size);
            file_handle.write(libso_buffer);
            file_handle.flush();
            file_handle.close();
            console.log("[dump]:", file_path);
        }
    }

    send("----do Tg hook----");
    var moduleName = "/data/data/org.telegram.messenger/files/lib/libtgvoip1.1loc.so";

    for(var i in Process.enumerateModulesSync()){
        var m = Process.enumerateModulesSync()[i];
        if(m["path"] === moduleName){
            send(m);
            var base_add = m['base'];
            var module_name = Process.findModuleByAddress(base_add);
            send("Load module: "+module_name.name);

//            var exports = module_name.enumerateExports();
//            send("--- exports:");
//            for(var i; i<exports.length;i++){
//                send(exports[i]);
//                if(exports[i].type == 'function'){
//                    send(exports[i].name);
//                }
//            }
//            send("------");

            //0xCED04     tgvoip::VoIPController::SetRemoteEndpoints
            //_ZN6tgvoip14VoIPController18SetRemoteEndpointsENSt6__ndk16vectorINS_8EndpointENS1_9allocatorIS3_EEEEbi
            //0x10b2dc    tgvoip::Endpoint::GetAddress
            //0xf74ec    tgvoip::VoIPController::SendRelayPings
            var GetAddress_add = parseInt(base_add) + 0x10b2dc;
            var GetAddress_addHex = "0x" + GetAddress_add.toString(16);
            GetAddress_addHex = new NativePointer(GetAddress_addHex);
            Interceptor.attach(GetAddress_addHex, {
                onEnter: function(args){
                    send("----hooked tgvoip::Endpoint::GetAddress at "+GetAddress_addHex);
                    send("arg1: "+args[0]+" = "+new NativePointer(args[0]).readS64());
//                    send("tgvoip::Endpoint p1 = "+new NativePointer(args[0]+0x8).readS64());
//                    send("tgvoip::Endpoint p2 = "+new NativePointer(args[0]+0x28).readS64());
                },
                onLeave: function(retval){
                    send("++++GetAddress return "+retval.toString());
                },
            });

            var SendRelayPings_add = parseInt(base_add)+0xf74ec;
            var SendRelayPings_addHex = "0x"+SendRelayPings_add.toString(16);
            SendRelayPings_addHex = new NativePointer(SendRelayPings_addHex);
            Interceptor.attach(SendRelayPings_addHex, {
                onEnter: function(args){
                    send("----hooked tgvoip::VoIPController::SendRelayPings at "+SendRelayPings_addHex);
                    send("arg1: "+args[0]+" = "+new NativePointer(args[0]).readS64());
                },
                onLeave: function(retval){
                    send("++++SendRelayPings return "+retval.toString());
                },
            });


            var SetRemoteEndpoints_add = parseInt(base_add) + 0xCED04;
            var SetRemoteEndpoints_addHex = "0x" +SetRemoteEndpoints_add.toString(16);
            SetRemoteEndpoints_addHex = new NativePointer(SetRemoteEndpoints_addHex);
            Interceptor.attach(SetRemoteEndpoints_addHex,{
                onEnter: function(args){
                    send("----hooked tgvoip::VoIPController::SetRemoteEndpoints at "+SetRemoteEndpoints_addHex);
                    send("arg1: "+args[0]+" = "+new NativePointer(args[0]).readS64());
                    send("arg2: "+args[1]+" = "+new NativePointer(args[1]).readS64());
                    send("arg3: "+args[2]);
                    send("arg4: "+args[3]);
                    send("method called from: \n"+Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
                    send("----finished");
                },
                onLeave: function(retval){
                }
            });

            //0xE4EB8  tgvoip::VoIPController::SendUdpPing
//            var SetRemoteEndpoints_add = parseInt(base_add) + 0xE4EB8;
//            var SetRemoteEndpoints_addHex = "0x" +SetRemoteEndpoints_add.toString(16);
//            SetRemoteEndpoints_addHex = new NativePointer(SetRemoteEndpoints_addHex);
//            Interceptor.attach(SetRemoteEndpoints_addHex,{
//                onEnter: function(args){
//                    send("----hooked tgvoip::VoIPController::SendUdpPing at "+SetRemoteEndpoints_addHex);
//                    send("arg1: "+args[0]);
//                    send("arg2: "+args[1]);
//                    send("method called from: \n"+Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
//                },
//                onLeave: function(retval){
//                }
//            });


        }
    }

    var VoIPController = Java.use("org.telegram.messenger.voip.VoIPController");
//    var TL_phoneConnection = Java.use("org.telegram.tgnet.TLRPC$TL_phoneConnection");
    VoIPController.setRemoteEndpoints.implementation=function(p1,p2,p3,p4){
        send("0000");
        // this.setRemoteEndpoints(p1);
        showStacks();
        this.setRemoteEndpoints(p1,p2,p3,p4);
    }
    VoIPController.start.implementation=function(){
        send("start");
        // this.setRemoteEndpoints(p1);
        showStacks();
        this.start();
    }

    var TL_phoneConnection = Java.use("org.telegram.tgnet.TLRPC$TL_phoneConnection");
    TL_phoneConnection.readParams.implementation=function(p1,p2){
        send("hooked TL_phoneConnection");
        this.readParams(p1,p2);
    }
    TL_phoneConnection.$init.implementation=function(){
        send("hooked TL_phoneConnection construct");
        this.$init();
    }

});