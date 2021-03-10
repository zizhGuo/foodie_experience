var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    // -1: canceled | 0: upcoming | 1：proceed
    status: Number,
    createdTime: Date,
    host: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         name: String,
         contact: String
    },
    guest: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         name: String,
         contact: String
    },
    experience: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience"
         },
         title: String,
         address: String
    },
    price: Number,
    date: Date
});

console.log("Schema: Order loaded...");

module.exports = mongoose.model("Book", bookSchema);