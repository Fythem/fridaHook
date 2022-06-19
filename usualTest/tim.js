Java.perform(function () {
    send("----do Hook----");
    var a=0;
    var AudioRecord = Java.use("android.media.AudioRecord");
    AudioRecord.startRecording.overload().implementation=function(){
        send("AudioRecord.startRecording: "+a++);
        this.startRecording();
    }
    var MediaRecorder = Java.use("android.media.MediaRecorder");
    MediaRecorder.start.overload().implementation=function(){
        send("MediaRecorder.start: "+a++);
        this.start();
    }

    var MediaRecorder = Java.use("android.media.MediaRecorder");
    MediaRecorder.execute.overload("java.lang.String","java.lang.String","android.taobao.windvane.jsbridge.WVCallBackContext").implementation=function(p1,p2,p3){
        send("hooked execute()");
        var result = this.execute(p1,p2,p3);
        return result;
    }

});