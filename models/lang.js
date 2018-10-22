var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mySchema = new Schema({
    de_DE: String,
    en_US: String,
    key: String
});

var myModel = mongoose.model("lang", mySchema, "lang");

module.exports = myModel;