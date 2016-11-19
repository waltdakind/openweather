var http = require('http');
var https = require('https');
var express = require('express');
var app = express();

//Lets define a port we want to listen to
const PORT= process.env.PORT || 8080; 

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.listen(process.env.PORT || 8080);