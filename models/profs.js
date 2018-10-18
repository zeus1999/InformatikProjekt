var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mySchema = new Schema({
    vorname: String,
    nachname: String,
    titel: String
});

var myModel = mongoose.model("professoren", mySchema, "professoren");

module.exports = myModel;