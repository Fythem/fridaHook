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

            //0xCED04     tgvoip::VoIPController::SetRemoteEndpoints
            //_ZN6tgvoip14VoIPController18SetRemoteEndpointsENSt6__ndk16vectorINS_8EndpointENS1_9allocatorIS3_EEEEbi
            //0x10b2dc    tgvoip::Endpoint::GetAddress
            //0xf74ec    tgvoip::VoIPController::SendRelayPings
            //0xED4E0    tgvoip::VoIPController::NetworkPacketReceived

            var SendRelayPings_add = parseInt(base_add)+0xED4E0;
            var SendRelayPings_addHex = "0x"+SendRelayPings_add.toString(16);
            SendRelayPings_addHex = new NativePointer(SendRelayPings_addHex);
            Interceptor.attach(SendRelayPings_addHex, {
                onEnter: function(args){
                    send("----hooked tgvoip::VoIPController::NetworkPacketReceived at "+SendRelayPings_addHex);
//                    send("arg1: "+args[0]+" = "+new NativePointer(args[0]).readS64());
                },
                onLeave: function(retval){
                    send("++++SendRelayPings return "+retval.toString());
                },
            });
        }
    }


    //java hook
    send("++++hook java code++++");
    var VoIPHelper=Java.use("org.telegram.ui.Components.voip.VoIPHelper");//向外拨打电话会hook到
    VoIPHelper.doInitiateCall.implementation=function(p1,p2){
        send("hooked VoIPHelper.doInitiateCall()");
        this.doInitiateCall(p1,p2);
    }
    var VoIPBaseService = Java.use("org.telegram.messenger.voip.VoIPBaseService");
    VoIPBaseService.showIncomingNotification.implementation=function(p1,p2,p3,p4,p5,p6){
        send("hooked showIncomingNotification");
        send("p1 = "+p1.toString());
        send("p2 = "+p2);
        send("p3 = "+p3.toString());
        send("p4 = "+JSON.stringify(p4));
        send("p5 = "+p5.toString());
        send("p6 = "+p6.toString());
        this.showIncomingNotification(p1,p2,p3,p4,p5,p6);
    }

    VoIPBaseService.handleNotificationAction.implementation=function(p1){
        send("hooked handleNotificationAction");
        send("p1_intent = "+p1.toString());
        this.handleNotificationAction(p1);
    }
    VoIPBaseService.acceptIncomingCallFromNotification.implementation=function(){
        send("hooked acceptIncomingCallFromNotification");
        this.acceptIncomingCallFromNotification();
    }

    var VoIPService = Java.use("org.telegram.messenger.voip.VoIPService");
    VoIPService.showNotification.implementation=function(){
        send("hooked showNotification");
        this.showNotification();
    }
    VoIPService.acceptIncomingCall.implementation=function(){
        send("hooked acceptIncomingCall");
        this.acceptIncomingCall();
    }

    var VoIPPermissionActivity = Java.use("org.telegram.ui.VoIPPermissionActivity");
    VoIPPermissionActivity.onCreate.implementation = function(){
        send("hooked VoIPPermissionActivity");
        this.onCreate();
    }

    VoIPPermissionActivity.onRequestPermissionsResult.implementation = function(p1,p2,p3){
        send("hooked onRequestPermissionResult");
        send("p1 = "+p1);
        send("p2 = "+p2);
        send("p3 = "+p3);
        this.onRequestPermissionResult(p1,p2,p3);
    }

});