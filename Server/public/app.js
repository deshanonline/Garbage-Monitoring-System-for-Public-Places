var elem = document.documentElement;
var UI_COMMAND_JSON = { COMMAND: "" };

var fullScreenStatus = false;
var fullScreenGridItem;
var socket;
$(document).ready(function () {
    $(".login-div").show();
    $('#main-div').hide();    
    $('#login-error-msg').hide();  
    connect();   
});



function connect() {
    
     socket = io('http://52.152.216.133:3001/');
   // socket = io('http://localhost:3001/');
    socket.on('connect', function(){
        console.log("Connect to Local Server");       

    });
    socket.on('INITIAL_RESPONCE', function (obj) {
        var data = JSON.parse(obj);
       // console.log("INITIAL_RESPONCE");
        //console.log(data);
        if(data.error_code==0){
            $(".login-div").hide();
            $('#main-div').show();    
            $('#login-error-msg').hide();
            $('#sign-out').html("<i class='fa fa-sign-out' aria-hidden='true'>logout</i>");
        }else{
            $("#login-error-msg").html(data.loginErrorMsg);
            $('#login-error-msg').show();            
        }
    });
        socket.on('UI_DATA', function (obj) {
        var data = JSON.parse(obj);
        //console.log(data.jsnObj);        
        tableDraw(data.jsnObj);
    });    

    $("#btn-login").click(function () {
        if ($("#txt-username").val() != null && $("#txt-username").val() != "" &&
            $("#txt-password").val() != null && $("#txt-password").val() != "") {
            var loginJson = { username: $("#txt-username").val(), password: $("#txt-password").val()}
            console.log("buton click debug");
            socket.emit("LOGIN", JSON.stringify(loginJson));
        }
    });
    $("#sign-out").click(function () {
        $(".login-div").show();
        $('#main-div').hide();    
        $('#login-error-msg').hide();  
        $("#txt-username").val("");
        $("#txt-password").val("");
    });

}

function secondsToHms(date) {

    var startDate = new Date(date);
    var endDate = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    d = Number(seconds);
    var day = Math.floor(d / 86400);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var dayDisplay = day > 0 ? day + (day == 1 ? " day ago " : " days ago") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour ago " : " hours ago") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute ago " : " minutes ago") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second ago " : " seconds ago") : "";
    var txt = "";
    if (day > 0) {
        txt = dayDisplay;
    } else {
        if (h > 0) {
            txt = hDisplay;
        } else {
            if (m > 0) {
                txt = mDisplay;
            } else {
                txt = sDisplay;
            }
        }
    }

    // return hDisplay + mDisplay + sDisplay;
    return txt;
}
function tableDraw(data){
   // console.log(data);
    var headerdata="<table><tr><th>Id</th><th>Name</th><th>Location</th><th>Type</th><th>Status</th><th>Last Collect Date</th><th></th></tr>";
    var enddata="</table>";
    var midData="";
     for(var i=0;i<data.length;i++){
         var bin=data[i];
        midData+="<tr><td>"+bin.id+"</td><td>"+bin.name+"</td><td>"+bin.location+"</td><td>"+bin.type+"</td><td>"+bin.status+"%</td><td>"+bin.lastCollect+"</td><td><i class='fa fa-recycle' onclick='binrest("+bin.id+")' aria-hidden='true'></i></td></tr>";
      //  console.log(bin);
     }
        
     $("#table").html(headerdata+midData+enddata);
}
function binrest(binId){
    var data = { id: binId}
            console.log("BIN_RESET "+binId);
            socket.emit("BIN_RESET", JSON.stringify(data));
}