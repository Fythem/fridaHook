Java.perform(function(){
//枚举当前加载的模块
var process_Obj_Module_Arr = Process.enumerateModules();
for(var i = 0; i < process_Obj_Module_Arr.length; i++) {
   //包含"lib"字符串的
   if(process_Obj_Module_Arr[i].path.indexOf("lib")!=-1)
   {
       console.log("模块名称:",process_Obj_Module_Arr[i].name);
       console.log("模块地址:",process_Obj_Module_Arr[i].base);
       console.log("大小:",process_Obj_Module_Arr[i].size);
       console.log("文件系统路径",process_Obj_Module_Arr[i].path);
   }
}
});