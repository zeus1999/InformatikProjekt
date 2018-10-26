var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mySchema = new Schema({
    url: String,
    display: String,
    quick: Boolean,
    sub: String
});

var myModel = mongoose.model("links", mySchema, "links");

module.exports = myModel;