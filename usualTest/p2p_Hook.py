#!usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2021/9/22 14:07
# @Author  : fy
# @FileName: p2p_Hook.py
from __future__ import print_function
import frida
import sys
import socket
import string

# Here's some message handling..
# [ It's a little bit more meaningful to read as output :-D
#   Errors get [!] and messages get [i] prefixes. ]
all_ip = []
script = None


def on_message(message, data):
    # print(message)
    # print(data)
    if message['type'] == 'error':
        print("[!] " + message['stack'])
    elif message['type'] == 'send':
        # print("-----------------------------")
        # print(message['payload'])
        if message['payload'] == "haha":
            print(data)
        if message['payload'] == "connect":
            # print (type(data))
            # print (data.encode('hex'))
            port = str(int(str(data[3].encode('hex')) + str(data[2].encode('hex')), 16))
            # print("port: " + str(int(port, 16)))

            ip1 = str(data[4].encode('hex'))
            ip2 = str(data[5].encode('hex'))
            ip3 = str(data[6].encode('hex'))
            ip4 = str(data[7].encode('hex'))
            ip = str(int(ip1, 16)) + "." + str(int(ip2, 16)) + "." + str(
                int(ip3, 16)) + "." + str(
                int(ip4, 16)) + ":" + port

            ddd = int(data[:1].encode('hex'), 16)
            # print(int(data[0].encode('hex'), 16))
            if ddd == socket.AF_INET:
                if ip not in all_ip:
                    print("" + ip)
                    all_ip.append(ip)
                    # print("AF_INET")
                # print(data.encode('hex'))
            elif ddd == socket.AF_UNIX:
                print("AF_UNIX")
            elif ddd == socket.AF_INET6:
                print("AF_INET6")
            elif ddd == socket.EAI_SOCKTYPE:
                print("EAI_SOCKTYPE")
            else:
                print("==" + data.encode('hex'))

    else:
        print(message['payload'])


def main():
    # process = frida.get_usb_device().attach("com.instagram.android")
    # process = frida.get_usb_device().attach("com.facebook.orca")
    # process = frida.get_usb_device().attach("com.tencent.mm")
    process = frida.get_usb_device().attach("com.whatsapp")
    # process = frida.get_usb_device().attach("org.thoughtcrime.securesms")//注册失败
    # process = frida.get_usb_device().attach("com.viber.voip")
    # process = frida.get_usb_device().attach("com.snapchat.android")
    # process = frida.get_usb_device().attach("com.studiokuma.callfilter")
    # process = frida.get_usb_device().attach("us.zoom.videomeetings")

    JSFile = open('p2p_Hook.js')
    JsCodeFromfile = JSFile.read()
    script = process.create_script(JsCodeFromfile)

    script.on('message', on_message)
    script.load()
    sys.stdin.read()


if __name__ == '__main__':
    main()
