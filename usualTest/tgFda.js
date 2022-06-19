Java.perform(function () {
    send('in Frida js')
    Interceptor.attach(Module.getExportByName("libc.so", 'sendto'), {
        onEnter: function(args) {
            send("connect----")
            //send("arg[0] = "+args[0])
            send("arg[5] = "+args[3])
            var addLen = args[5]
            //send("addLen = "+addLen+"-->"+new Int64(addLen.toString()));
            send('connect', Memory.readByteArray(args[4], new Int64(addLen.toString())))
        }
    });
});
