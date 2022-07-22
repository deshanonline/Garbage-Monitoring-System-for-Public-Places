function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    console.log("Array remove".bgBlack.red)
    return arr;
}

function pushA(arr,value) {
    if(!arr.includes(value)){
        arr.push(value);
    }
    return arr;
}


function getDateTime(){
  var date = new Date();
return dateStr =
  ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  ("00" + date.getDate()).slice(-2) + "/" +
  date.getFullYear() + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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

function fileWrites(){    
  if(fileObj!=null){
    // jsonfile.writeFile(file, fileObj, function (err) {
    //   console.error("writefile error:" + err);        
    // });
    try {
    var json = JSON.stringify(fileObj);
    console.log(json);
   // fs.writeFileSync(file, json);
  } catch (err) {
    console.log("File error"+err) ;
   
  }
    // fs.writeFile(file, fileObj, 'utf8', function (err) {
    //      console.error("writefile error:" + err);        
    //    });
}
}
function indexOfCurrentBinArray(array,BinId){
  var returnValue=-1;
  if(typeof(array)!="undefined"&& array!=null){
  for(var x=0;x< array.length;x++){
    var node=array[x];
    if(node.id==BinId){
      returnValue=x;
    }
  }
}
  return returnValue;
}
