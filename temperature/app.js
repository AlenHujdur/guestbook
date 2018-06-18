var path = require('path');
var express = require('express');
var zipdb = require('zippity-do-dah');
var ForecastIo = require('forecastio');

var app = express();
var weather = new ForecastIo("2ec9b1fa287a1af511372484308aa326");
