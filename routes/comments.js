var express = require("express");
// var router  = express.Router();
var router  = express.Router({mergeParams: true});
var Experience = require("../models/experience");
var Comment = require("../models/comment");
var middleware = require("../middleware/authentication");

console.log("Comment Router module loaded!");


router.get("/", function(req, res){
   res.send("comment router entered!"); 
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    Experience.findById(req.params.id, function(err, foundExperience){
        if(err){
            console.log(err);
        } else {
            console.log("Comment create page, current logged in user: " + req.user);
             res.render("comments/new", {experience: foundExperience});
            // console.log(foundExperience);
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Experience.findById(req.params.id, function(err, foundExperience){
        if(err){
            console.log(err);
            res.redirect("/experiences");
        } else {
             Comment.create(req.body.comment, function(err, comment){
                if(err){
                    // req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    console.log("created comment" + comment);
                    //add username and id to comment
                    // comment.author.id = req.user._id;
                    // comment.author.username = req.user.username;
                    //save comment
                    // comment.save();

                    foundExperience.comments.push(comment);
                    foundExperience.save();
                    // console.log(req);
                    // console.log(req.user.comments);
                    // console.log(reqw.user);
                    req.user.comments.push(comment);
                    req.user.save();
                    res.redirect('/experiences/' + foundExperience._id);
                   
                    // req.flash("success", "Successfully added comment");
                }
             });
        }
    });
});


module.exports = router;