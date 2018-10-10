var express = require("express");
var router = express.Router();

module.exports = (app) => {

    var routes = {
        get: {
            socket: require("./routes/get/socket.js"),
            main: require("./routes/get/main.js"),
            upload: require("./routes/get/upload.js")
        },
        post: {
            upload: require("./routes/post/upload.js")(app)
        }
    };

    router.use("/", routes.get.main);

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