var Experience = require("../models/experience");
var Comment = require("../models/comment");

var middlewareObject = {}


// verify if user is currently logged in
middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        console.log("continue!");
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObject.checkExperienceOwnship = function(req, res, next){
    if(req.isAuthenticated()){
        Experience.findById(req.params.id, function(err, foundExperience){
            if (err) {
                console.log(err);
            }
            else{
                console.log(foundExperience);
                console.log(foundExperience.host.id);
                console.log(req.user._id);
                if (foundExperience.host.id.equals(req.user._id)) {
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObject.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err){
                  res.redirect("back");
              }  else {
               if(foundComment.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
              }
           });
       } else {
           req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
       }
   }

module.exports = middlewareObject;