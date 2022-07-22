// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const screenfull = require('screenfull');
const colors = require('colors');

var http = require('http');
const fs = require('fs');
eval(fs.readFileSync('./include/Constants.js') + '');
eval(fs.readFileSync('./include/CommonFunctions.js') + '');

var redis = require("redis");
var sio = require("socket.io");
var jsonfile = require('jsonfile');

const delay = require('delay');
const e = require("express");
/**
 * 
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
var setsetIntervalTimer;
console.log("_______________________________________________________________________");
console.log("|   " + getDateTime() + "   | Smart Garbage Management System Server init");
console.log(colors.bgBlack.green("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾"));



var file = 'data/data.ini'
var fileObj = fileRead();
/**
 *  Validate
 */
console.table(fileObj.bins);

app.set('port', 3001);
var server = http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
var io = require('socket.io').listen(server);


/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


var jsnObj;
/**
 * Routes Definitions
 */

app.get("/", (req, res) => {

  // res.render("index", { title: "Home" });  
  //res.render("index", {namex:name});
  res.render("index", {});
});

// app.get("/user", (req, res) => {
//     res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
//   });

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

io.sockets.on('connection', function (socket) {
  console.log("Socket connected");
  console.log(socket.id);  
  //fileWrite();

  socket.on('disconnect', function (data) {
    console.log("Socket disconnect");
    console.log(socket.id);    
  });

  socket.on('UI_COMMAND', function (data) {
    console.log("UI_COMMAND", data);
    
  });
  socket.on('BIN_RESET', function (msg) {
    var data=JSON.parse(msg);
    console.log("BIN_RESET", data);
    for (var x = 0; x < fileObj.bins.length; x++) {    
      var bin = fileObj.bins[x];     
      if (bin.id==data["id"]) {
        bin.status=0;
        bin.lastCollect=getDateTime();
        fileObj.bins[x]=bin;                                        //TODO bug in this file write when it uncoment socket disconect 
        //
      }
    }  
  });
  socket.on('BIN_DATA', function (data) {
    console.log("BIN_DATA", data);
    var newstatus=true;
    for (var x = 0; x < fileObj.bins.length; x++) {    
      var bin = fileObj.bins[x];     
      if (bin.id==data.id) {
        newstatus=false;
        bin.status=data.binstatus;
        bin.statusUpdate=getDateTime();
        fileObj.bins[x]=bin;                                        //TODO bug in this file write when it uncoment socket disconect 
        //
      }
    }  
    if(newstatus){
      var newbin={};
      newbin.id=data.id;
      newbin.status=data.binstatus;
      newbin.location=data.location;
      newbin.name=data.binname;
      newbin.type=data.type;        
      newbin.lastCollect="";
      newbin.statusUpdate=getDateTime();
      fileObj.bins.push(newbin); 
    }
    //fileWrite();
    
  });
  socket.on('INITIAL', function (obj) {
    var data = JSON.parse(obj);
    console.log("INITIAL".bgBlack.green);
    console.log(data);
     
  });
  socket.on('LOGIN', function (obj) {
    var data = JSON.parse(obj);
    if(data.username=="vihanga"){
        if(data.password=="1234"){
          var responce= { states: "sucess",error_code:0,error:null }
          io.sockets.emit("INITIAL_RESPONCE", JSON.stringify(responce));
        }else{
          var responce= { states: "failed",error_code:2,error:"Invalid Password" }
          io.sockets.emit("INITIAL_RESPONCE", JSON.stringify(responce));
        }
    }else{
      var responce= { states: "failed",error_code:1,error:"Invalid User Name" }
        io.sockets.emit("INITIAL_RESPONCE", JSON.stringify(responce));
    }    
  });
  clearInterval(setsetIntervalTimer);
  setsetIntervalTimer= setInterval(function () {
    sendUIDFVData();
  },1000);
});

function sendUIDFVData() {  

  var jsnObjHeartBeat = {      
    jsnObj: fileObj.bins
  };
   io.sockets.emit("UI_DATA", JSON.stringify(jsnObjHeartBeat));
    console.log("socket emited");
    console.table(jsnObjHeartBeat.jsnObj);
    //fileWrite();
}
