var express = require("express");
var fs = require("fs");
var router = express.Router();
var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/student_helper";
mongoose.connect(mongoDB);

module.exports = (app) => {

    async function getProfs(){
        var ProfModel = require("./models/profs.js");
        var data = await ProfModel.find({}, "-_id -__v").lean().exec();
        
        return data;
    }

    async function getLinks(){
        var LinkModel = require("./models/links.js");
        var data = await LinkModel.find({}, "-_id -__v").lean().exec();
        
        return data;
    }


    async function getQuick(){
        var LinkModel = require("./models/links.js");
        var data = await LinkModel.find({ quick: true }, "-_id -__v").lean().exec();
        
        return data;
    }

    async function getLang(lang){
        var LangModel = require("./models/lang.js");
        var data = await LangModel.find({}, "-_id -__v").lean().exec();
        
        var tmp = {};
        for(var i = 0; i < data.length; i++){            
            tmp[data[i].key] = data[i][lang];
        }

        return tmp;
    }

    const sendRequest = function(url){
        return new Promise((resolve, reject) => {
          const lib = url.startsWith('https') ? require('https') : require('http');
          const request = lib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
               reject(new Error('Failed to load page, status code: ' + response.statusCode));
             }
            const body = [];
            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => resolve(body.join('')));
          });
          // handle connection errors of the request
          request.on('error', (err) => reject(err))
          })
      };
      

    router.use("/rest/lang/de", async function(req, res){

        var data = await getLang("de_DE");
        res.send(data);
    
    });
    

    router.use("/rest/lang/en", async function(req, res){

        var data = await getLang("en_US");
        res.send(data);
    
    });
    

    router.use("/rest/profs", async function(req, res){

        var data = await getProfs();
        res.send(data);
    
    });
    

    router.use("/rest/links", async function(req, res){

        var data = await getLinks();
        res.send(data);
    
    });

    

    router.use("/rest/quick", async function(req, res){

        var data = await getQuick();
        res.send(data);
    
    });


    router.use("/rest/kurse", async function(req, res){
        res.send(fs.readFileSync("./tmp/kurs.html", "utf8"));
    });
    

    router.use("*", require("./routes/get/main.js"));

    //get upload
    //router.use("/upload", routes.get.upload);

    //main page
    //router.use("/main", routes.get.main);

    //get socket
    //router.use("/socket", routes.get.socket);
    
    //post upload
    //router.use("/upload", routes.post.upload);

    return router;


}   