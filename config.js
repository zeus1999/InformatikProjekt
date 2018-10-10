var path = require("path");

var config = {};

//main webserver
config.port = 80;


//socket server
config.socket = {};
config.socket.port = 3200;
config.socket.view = path.join(__dirname, "./views/socket.html");


//upload module
config.upload = {};
config.upload.path = path.join(__dirname, "./upload/");
config.upload.view = path.join(__dirname, "./views/upload.html");

module.exports = config;