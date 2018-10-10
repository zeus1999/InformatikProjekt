var express = require("express");
var router = express.Router();
var busboy = require("connect-busboy");
var path = require("path");
var fs = require("fs");

var config = require("../../config.js");

module.exports = (app) => {

    app.use(busboy());

    router.post("/", (req, res) => {
        
        req.pipe(req.busboy);
    
        req.busboy.on("file", (fieldname, file, filename) => {
            
            var fstream = fs.createWriteStream(path.join(config.upload.path, filename));
    
            file.pipe(fstream);
    
            fstream.on("close", () => {
                res.redirect("/upload");
            });
            
        });
    
    });

    return router;
   

};