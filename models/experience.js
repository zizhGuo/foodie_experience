var mongoose = require("mongoose");

var experienceSchema = new mongoose.Schema({
   price: Number,
   title: String,
   address: String,
   rating: Number,
   duration: Number,
   group: Number ,
   services: [
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
       }
   ],
   // language:{
   //      type: mongoose.Schema.Types.ObjectId,
   //      ref: "Language"
   // },
   language: String,
   description: String,
   // host: {
   //    id: {
   //       type: mongoose.Schema.Types.ObjectId,
   //       ref: "User"
   //    },
   //    name: String,
   //    thumbnail : String,
   //    selfintro: String
   // },   
   host: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
      // name: String,
      // thumbnail : String,
      // selfintro: String
   },
   images_host: [String],
   images_guests:[String],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

console.log("Schema: Experience loaded...");

module.exports = mongoose.model("Experience", experienceSchema);