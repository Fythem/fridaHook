Java.perform(function () {
    //byte[] to String
    function byte2string(array){
        var result = "";
        array = new Uint8Array(array);
        for(var i = 0; i < array.length; ++i){
            result+= (String.fromCharCode(array[i]));
        }
        return result;
    }
    //byte[] to HexString
    function byteToHexString(uint8arr) {
        if (!uint8arr) {
            return '';
        }
        var hexStr = '';
        for (var i = 0; i < uint8arr.length; i++) {
            var hex = (uint8arr[i] & 0xff).toString(16);
            hex = (hex.length === 1) ? '0' + hex : hex;
            hexStr += hex;
        }
        return hexStr.toUpperCase();
    }
    console.log('in Frida js')
//    Interceptor.attach(Module.getExportByName("libc.so", 'connect'), {
//        onEnter: function(args) {
//            console.log(">"+args[0])
//            console.log(">"+args[1])
//            console.log(">"+args[2])
//            send('connect', Memory.readByteArray(args[1], 16))
//        }
//    });
    var ips = []
    var native_p = Module.getExportByName("libc.so", 'sendto');
    Interceptor.attach(native_p, {
        onEnter: function(args) {
//            console.log("+++++++++++++++++++++++++++++++++++++++")
//            console.log('Context  : ' + JSON.stringify(this.context));
//            console.log("===1_socket===>"+parseInt(args[0]))
//            console.log("===2_buf===>"+args[1])
//            console.log("===3_len===>"+parseInt(args[2]))
//            console.log("===4_flags===>"+parseInt(args[3]))
//            console.log("===5_addr===>"+args[4])
//            console.log("===6_addrlen===>"+args[5])
            if (args[5] == 0x0){
//                console.log("000000000000000")
                return
            }
            var addr_len = parseInt(args[5], 16);
            var addr = args[4].readByteArray(addr_len);

            var xxx = hexdump(addr, {
                            offset: 4,
                            length: 8,
                            header: true,
                            ansi: false
                        });

            var pp = String(xxx).substring(86,97).split(' ')
            var ip = []
            for(var i=0; i<pp.length; i++){
                ip[i] = parseInt(pp[i],16)
            }
            var ip_str = ip.join('.')
            if(ips.indexOf(ip_str) == -1){
                ips.push(ip_str)
                console.log(ip_str)
            }


//            var buffer_len = parseInt(args[2], 16);
//            // Reads the value of the specified address
//            var buffer = args[1].readByteArray(buffer_len);
//            // Prints hexadecimal and corresponding ASCII
//            console.log("sendto() buff:")
//            console.log(hexdump(buffer, {
//                offset: 0,
//                length: buffer_len,
//                header: true,
//                ansi: false
//            }));

            // print called stack
//            console.log('sendto called from:\n' +
//                Thread.backtrace(this.context, Backtracer.ACCURATE)
//                .map(DebugSymbol.fromAddress).join('\n') + '\n');
        },
        onLeave: function(retval) {
//            console.log("---------------------------------------")
//            console.log("retval: " + retval)
//            send("end")
        }
    });
});