import addon from '../build/Release/raspiSonarAddon';

// Sonar class provides a read method to interact with an ultrasonic sensor
export default class Sonar {
  constructor(opts) {
    this.opts = Object.assign({}, {
      callWiringPiSetup: true
    }, opts);

    this.sensor = addon.RaspiSonar(this.opts); 
  }
  
  // Accepts function as an argument which is called back with a duration
  read(callback) {
    this.sensor.read(callback);
  }
}