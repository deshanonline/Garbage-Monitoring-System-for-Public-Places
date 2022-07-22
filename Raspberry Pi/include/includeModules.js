var express = require('express');
var cors = require('cors');
var dateFormat = require('dateformat');
var request = require('request');
const delay = require('delay'); 
var jsonfile = require('jsonfile');
//var gpio = require('rpi-gpio');

//socket IO
var app = express();
