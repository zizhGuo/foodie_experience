var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         name: String,
         thumbnail : String
    },
    date: Date,
    rating: Number,
    content: String
});

console.log("Schema: Comment loaded...");

module.exports = mongoose.model("Comment", commentSchema);