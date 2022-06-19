Java.perform(function () {

    function writeFile(content){
        var fileLua = new File("/sdcard/lua.txt", "a+");
        fileLua.write(content+"\n");
        fileLua.flush();
        fileLua.close();
    }

    send("in js");
    var addr = Module.findExportByName('libtolua.so' , 'luaL_loadbuffer');
    Interceptor.attach(addr, {
        onEnter: function(args) {
            send("hooked")
            var name = Memory.readUtf8String(args[3]);
            var obj = {}
            obj.size = args[2].toInt32()
            obj.name = name;
            obj.content = Memory.readCString(args[1], obj.size);
            send(obj);
            writeFile(obj.content);
        }
    } )
});