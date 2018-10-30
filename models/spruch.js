var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mySchema = new Schema({
    spruch: String,
    professor: String
});

var myModel = mongoose.model("spruch", mySchema, "spruch");

module.exports = myModel;