var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mySchema = new Schema({
    type: String,
    i18: {
        german: String,
        english: String
    }
});

var myModel = mongoose.model("displayMessage", mySchema, "displayMessage");

module.exports = myModel;