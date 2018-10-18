var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mySchema = new Schema({
    url: String,
    display: String
});

var myModel = mongoose.model("links", mySchema, "links");

module.exports = myModel;