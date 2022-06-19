# -*- coding: utf-8 -*

import frida, sys, os

# """
# adb forward tcp:27042 tcp:27042
# adb forward tcp:27043 tcp:27043
# """

PACKAGE = 'com.ycgame.t11'



# luaL_loadbuffer

jscode = '''

var addr = Module.findExportByName('libtolua.so' , 'luaL_loadbuffer');

Interceptor.attach(addr, {
    onEnter: function(args) {
        var name = Memory.readUtf8String(args[3]);
        var obj = {}
        obj.size = args[2].toInt32()
        obj.name = name;
        obj.content = Memory.readCString(args[1], obj.size);
        send(obj);
        var fileLua = new File("/sdcard/lua.txt", "a+");
        fileLua.write(obj.content+"\n");
        fileLua.flush();
        fileLua.close();
    }
} )
'''


def write(path, content):
    print('write:', path)
    folder = os.path.dirname(path)
    if not os.path.exists(folder):
        os.makedirs(folder)
    open(path, 'wb').write(content)


def on_message(message, data):
    # print 'message:',message
    name = message['payload']['name']
    content = message['payload']['content'].encode('utf-8')
    # if name.endswith('.lua'):
    write(name, content)
        
        
process = frida.get_usb_device().attach(PACKAGE)
script = process.create_script(jscode)
script.on('message', on_message)
print('[*] Running!')
script.load()
sys.stdin.read()
