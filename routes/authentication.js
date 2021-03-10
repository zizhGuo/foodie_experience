var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    // var newUser = new User({username: req.body.username});

    var newUser = new User({
        username    :   req.body.username,
        name        :   req.body.name,
        language    :   req.body.language,
        contact     :   req.body.contact,
        thumbnail   :   req.body.thumbnail,
        location    :   req.body.location,
        selfintro   :   req.body.selfintro
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/experiences"); 
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/experiences",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    if (!res){
        res.redirect("/login");
        console.log("no res?");
    } 
    else{
        console.log("logout route");
        req.flash("success", "Logged you out!");
        res.redirect("/experiences");
    }
 });



module.exports = router;
