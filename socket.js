var crypto = require("crypto");

module.exports = (io) => {

    var userlist = [];

    // global on 
    io.on("connection", (socket) => {
        
        var userId = crypto.randomBytes(20).toString("hex");
        userlist[userId] = socket;


        //disconnect - remove from userlist
        socket.on("disconnect", () => {
            delete userlist[userId];
        });

    });
    
}