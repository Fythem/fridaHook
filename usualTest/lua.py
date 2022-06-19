# -*- coding: utf-8 -*

import frida, sys, os

# """
# adb forward tcp:27042 tcp:27042
# adb forward tcp:27043 tcp:27043
# """
PACKAGE = 'com.ycgame.t11'


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


if __name__ == "__main__":
    process = frida.get_usb_device().attach(PACKAGE)
    JSFile = open('lua.js')
    JsCodeFromfile = JSFile.read()
    script = process.create_script(JsCodeFromfile)
    script.on('message', on_message)
    print('[*] Running!')
    script.load()
    sys.stdin.read()
