var express = require("express");
var router = express.Router();

module.exports = (app) => {

    var routes = {
        get: {
            main: require("./routes/get/main.js")
        }
    };

    router.use("*", routes.get.main);

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