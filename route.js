var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/student_helper";
mongoose.connect(mongoDB);

module.exports = (app) => {

    async function getProfs(){
        var ProfModel = require("./models/profs.js");
        var data = await ProfModel.find({}, "-_id -__v").lean().exec();
        console.log(data);
        
        return data;
    }

    router.use("/rest/profs", async function(req, res){

        var data = await getProfs();
        res.send(data);
    
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