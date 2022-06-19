Java.perform(function () {
    send("----do Hook----");

    var a = Java.use("org.customer.fu.a");
    a.b.overload('[B').implementation = function(p1_str){
        send("hooked WebViewActivity");
        send("param = "+ p1_str)
        var result = this.b(p1_str);
        send("--"+result)
        return result;
    }
});