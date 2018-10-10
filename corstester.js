var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var cors = require("cors"); 

var route = require("./route.js");

app.use("/", route);


var whitelist = [ "http://localhost:3000" ];
var cop =  {
    origin: function(origin, cb){
        if(whitelist.indexOf(origin) !== -1){
            cb(null, true);
        } else {
            cb(new Error("access denied"));
        }
    }
}
app.use(cors(cop));


app.listen(3001, function () {
    console.log("[DevServer] is up and running on port 3001");
}); 