var express = require("express");
var router = express.Router();
var config = require("../../config.js");

router.get("/", (req, res) => {
    res.sendFile(config.socket.view);
});

module.exports = router;