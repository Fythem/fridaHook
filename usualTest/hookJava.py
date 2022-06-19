# encoding=utf8
import socket
import struct

import frida
import sys

reload(sys)
sys.setdefaultencoding('utf8')


def on_message(message, data):
    # print(message)
    if message['type'] == 'send':
        if message['payload'] == "connect":
            print(data)
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
        # print("[*] {0}".format(message['payload']))
    else:
        print(message)


def str_to_hex(s):
    return ''.join([hex(ord(c)).replace('0x', '') for c in s])


if __name__ == "__main__":
    # googleAssistant: com.google.android.googlequicksearchbox:search
    # process = frida.get_usb_device().attach('com.lite.lanxin')
    # process = frida.get_usb_device().attach('org.telegram.messenger')
    # process = frida.get_usb_device().attach('org.tech.fu')
    # process = frida.get_usb_device().attach('com.tencent.tim')
    # process = frida.get_usb_device().attach('com.ss.android.article.news')
    process = frida.get_usb_device().attach('com.taobao.taobao')

    JSFile = open('tim.js')
    JsCodeFromfile = JSFile.read()
    script = process.create_script(JsCodeFromfile)
    script.on('message', on_message)
    print('[*] Running Frida hook')
    script.load()
    sys.stdin.read()
