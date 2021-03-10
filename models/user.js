var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    location: String,
    language: String,
    contact: String,
    thumbnail: String,
    selfintro: String,
    
    // EXPERIENCES that hosting
    experiences: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Experience"
        }
    ],

    // WISHLIST that saves EXPERIENCES
    saved:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience"
         }
    ],

    // Booking Page exclusive
    // BOOK order for being a host
    Book_host:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ],

    // BOOK order for being a guest
    Book_guest:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
         }
    ],

    // Socialization exclusive
    // USERS who are followed by current USER
    following:[
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            name: String,
            Thumbnail: String
        }
    ],

    //USERS who are following current USER
    followers:[
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            name: String,
            Thumbnail: String
        }
    ],

    // POSTS
    posts: [String],

    // COMMENTS from EXPERIENCEs that current USER hosts
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

console.log("Schema: User loaded...");

module.exports = mongoose.model("User", userSchema);