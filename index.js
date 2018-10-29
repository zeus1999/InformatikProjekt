var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");

var server = require("http").createServer(app);
var io = require("socket.io")(server);

var route = require("./route.js")(app);
var config = require("./config.js");
var sched = require("./scheduled-tasks");


//static folder
app.use("/public", express.static("public"));

//route
app.use("/", route);

//socket server
require("./socket.js")(io);

  
//listen
app.listen(config.port, function () {
    console.log("[DevServer] is up and running on port " + config.port);
}); 

//listen socket
server.listen(config.socket.port);