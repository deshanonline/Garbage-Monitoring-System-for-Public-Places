# raspi-hc-sr04

RaspberryPi - Native Node.js extension to interact with an Ultrasonic Sensor (HC-SR04).

## Fork

Forked from `raspi-sonar` project to resolve some issues around wiringpi and other modernizing (gulp + babel).  Also I had trouble getting the one wire scheme working, so I adapted the code to use two pins.

## Installation

```
apt-get install wiringpi
npm install raspi-hc-sr04
```

## Example

Note that GPIO pins are rated at 3.3v. An ultrasonic sensor like the HC-SR04 outputs 5v on the echo pin which could harm your Raspberry Pi's GPIO pins. Take care to use a voltage divider circuit to lower the voltage from the ECHO pin to the GPIO pin.

### Circuit

<img src="https://github.com/smysnk/raspi-hc-sr04/blob/master/docs/sonar-circuit.png" width="480" />

### Code

```javascript
import Sonar from 'raspi-hc-sr04';
let sonar = new Sonar({ triggerPin: 4, echoPin: 31 });

sonar.read((duration) => {
  let distance = 343.0 * duration / 10000 * .5;
  console.log(`duration: ${ duration } distance: ${ distance }cm`);
});
```

## API

raspi-hc-sr04 npm package exposes a single class called Sonar. The Sonar class has a single public method that takes the wiringPi pin number as an argument. If you installed [wiringPi](http://wiringpi.com) you can check the which pin number to use by typing the command `gpio readall`. The output for a Raspberry Pi ZeroW would look like the below diagram. Note the 'wPi' columns.

<img src="https://github.com/smysnk/raspi-hc-sr04/blob/master/docs/gpio-readall.png" width="480" />

### License

The MIT License (MIT)

Copyright (c) 2020 Joshua Bellamy  
Copyright (c) 2016 Seshi Chemudugunta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
