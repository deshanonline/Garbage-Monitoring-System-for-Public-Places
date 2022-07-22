const fs = require('fs');

eval(fs.readFileSync('include/includeModules.js') + '');
eval(fs.readFileSync('include/includeCommonFunctions.js') + '');


const Gpio = require('pigpio').Gpio;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(11, {mode: Gpio.OUTPUT});
const echo = new Gpio(8, {mode: Gpio.INPUT, alert: true});
const led = new Gpio(4, {mode: Gpio.OUTPUT});

trigger.digitalWrite(0); // Make sure trigger is low

var binbotom=100;                                   //TODO
var binfull=10;                                     //TODO
var binvalue=0;
var ledcount=0;

var file = 'data/data.ini'
var fileObj = fileRead();
var count=0;
const
    io = require("socket.io-client"),
    //ioClient = io.connect("http://localhost:3001");
    ioClient = io.connect("http://202.124.183.60:3001");
    
    

    setsetIntervalTimer= setInterval(function () {
        
        fileObj.binstatus=binvalue;
        
       // console.log(fileObj);
        
        ioClient.emit("BIN_DATA",fileObj);

      },1000);




const watchHCSR04 = () => {
  let startTick;
  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
     // console.log("start tick");
    } else {
      //console.log("dd");
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      var temps=(diff / 2 / MICROSECDONDS_PER_CM).toFixed(0);
      if(temps>binfull*9/10){
      	if(temps<binbotom){
      binvalue=((binbotom-temps)*100/(binbotom-binfull)).toFixed(1);
  		}else{
  			binvalue=0;
  		}
      if(binvalue>=98){
        led.digitalWrite(1);
        ledcount=0;
      }else{
        if(ledcount>5){
        led.digitalWrite(0);
        }
      }
      console.log(temps);
      console.log("bin value    "+binvalue +" %");
  }
    }
  });
};

watchHCSR04();

// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
  ledcount++;
}, 1000);