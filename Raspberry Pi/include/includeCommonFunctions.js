function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function pushA(arr,value) {
    if(!arr.includes(value)){
        arr.push(value);
    }
    return arr;
}

function fileRead(){    
    try {
        console.log("file reading..:");
        return jsonfile.readFileSync(file, function (err) {   
          
          console.log("file error:" + err);
        });
      } catch (err) {
        console.log("File error"+err) ;
        return null;
      }
}
function fileWrite(){    
    if(fileObj!=null){
      jsonfile.writeFile(file, fileObj, function (err) {
        console.error("writefile error:" + err);        
      })
  }
}
