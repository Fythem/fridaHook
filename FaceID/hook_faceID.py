#!usr/bin/env python3
# -*- coding: utf-8 -*-
# @Time    : 2021/6/7 13:05
# @Author  : fy
# @FileName: hook_faceID.py
import sys

reload(sys)
sys.setdefaultencoding('utf8')
import frida
import base64


def on_message(message, data):
    if message['type'] == 'send':
        if isinstance(type(message['payload']), unicode):
            print("[*] {0}".format(message['payload'].decode("unicode-escape")))
        if isinstance(type(message['payload']), list):
            print(message['payload'])
            # for i in message['payload']:
            #     print i

    else:
        print(message)


def main():
    process = frida.get_usb_device().attach('com.rrh.jdb')

    # JSFile = open('mayi.js')
    # JSFile = open('pingan.js')
    # JSFile = open('sensetime通杀脚本.js')
    # JSFile = open('jdb.js')
    # JSFile = open('jdb2.js')
    # JSFile = open('jdb3.js')
    JSFile = open('jdb4.js')
    JsCodeFromfile = JSFile.read()
    script = process.create_script(JsCodeFromfile)
    script.on('message', on_message)
    print('[*] Running Frida hook')
    script.load()
    sys.stdin.read()


if __name__ == '__main__':
    main()
