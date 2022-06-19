from __future__ import print_function
import frida
import sys
import socket
import string
import struct

# session = frida.get_usb_device().attach("org.telegram.messenger")
session = frida.get_usb_device().attach("com.instagram.android")
# session = frida.get_usb_device().attach("com.facebook.orca")
print('[*] Running Frida hook')
script = session.create_script("""
send('in Frida js')
Interceptor.attach(Module.getExportByName("libc.so", 'connect'), {
    onEnter: function(args) {
        send("connect----")
        //send("arg[0] = "+args[0])
        //send("arg[1] = "+args[1])
        var addLen = args[2]
        //send("addLen = "+addLen+"-->"+new Int64(addLen.toString()));
        send('connect', Memory.readByteArray(args[1], new Int64(addLen.toString())))
    }
});
Interceptor.attach(Module.getExportByName("libc.so", 'sendto'), {
    onEnter: function(args) {
        send("sendto----")
        //var addLen = new NativePointer(args[4])
        //send('connect', Memory.readByteArray(args[1], new Int64(addLen.toString())))
        send("a____"+Memory.readByteArray(args[4], 16))
        send("b____"+ args[4])
    }
});

""")


# Here's some message handling..
# [ It's a little bit more meaningful to read as output :-D
#   Errors get [!] and messages get [i] prefixes. ]
def on_message(message, data):
    if message['type'] == 'error':
        print("[!] " + message['stack'])
    elif message['type'] == 'send':
        # print(message['payload'])
        # print(data)
        if message['payload'] == "connect":
            if int(data[0].encode('hex'), 16) == socket.AF_INET:
                print("AF_INET")
                port = str(int(str_to_hex(data[2:4]), 16))
                # print('port = '+port)
                int_ip = int(data[4:8].encode('hex'), 16)
                print('ip:port = '+socket.inet_ntoa(struct.pack('I', socket.htonl(int_ip)))+":"+port)
                # print(data)
            elif int(data[0].encode('hex'), 16) == socket.AF_UNIX:
                print("AF_UNIX")
                # print(data.encode('hex'))
                # print(data)
            elif int(data[0].encode('hex'), 16) == socket.AF_INET6:
                print("AF_INET6")
                # print(data)
            else:
                print(data.encode('hex'))
                # print(data)
        else:
            print("[*] {0}".format(message['payload']))
    else:
        print(message)


def str_to_hex(s):
    return ''.join([hex(ord(c)).replace('0x', '') for c in s])


script.on('message', on_message)
script.load()
sys.stdin.read()
