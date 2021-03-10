var express = require("express");
// var router  = express.Router();
var router  = express.Router({mergeParams: true});
var Experience = require("../models/experience");
var middleware = require("../middleware/authentication");

console.log("Book Router module loaded!");


router.get("/book", middleware.isLoggedIn, function(req, res){
    Experience.findById(req.params.id, function(err, foundExperience){
        if(err){
            console.log(err);
        } else {
            console.log("Comment create page, current logged in user: " + req.user);
             res.render("books/book", {experience: foundExperience});
            // console.log(foundExperience);
        }
    }) 
});


module.exports = router;