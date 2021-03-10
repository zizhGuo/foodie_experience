// home page for showing experiences

var express = require("express");
var router  = express.Router();
var bodyParser  = require("body-parser");
var Experience = require("../models/experience");
var middleware = require("../middleware/authentication");

router.use(bodyParser.urlencoded({extended: true}));

// INDEX - show all experiences
router.get("/", function(req, res){
    // Get all experiences from DB
    console.log("Current logged in user: " + req.user);
    Experience.find({}, function(err, allExps){
        if(err){
            console.log(err);
        } else {
            res.render("experiences/index",{experiences: allExps});
        }
        });
});

//CREATE - add new experience to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    console.log(req.body.title);
    console.log(req.body.price);
    console.log(req.body.location);
    console.log(req.body.duration);
    console.log(req.body.group);
    console.log(req.body.language);
    console.log(req.body.description);
    console.log(req.body.images_host);

    var newExperience = {
        title : req.body.title,
        price : req.body.price,
        location : req.body.location,
        duration : req.body.duration,
        group : req.body.group,
        language : req.body.language,
        description : req.body.description,
        images_host : [],
        host: {
            id: req.user._id,
            name: req.user.name,
            thumbnail : req.user.thumbnail,
            selfintro: req.user.selfintro
        }
    }
    if(req.body.images_host1) newExperience.images_host.push(req.body.images_host1);
    if(req.body.images_host2) newExperience.images_host.push(req.body.images_host2);
    if(req.body.images_host3) newExperience.images_host.push(req.body.images_host3);
    if(req.body.images_host4) newExperience.images_host.push(req.body.images_host4);
    if(req.body.images_host5) newExperience.images_host.push(req.body.images_host5);
    if(req.body.images_host6) newExperience.images_host.push(req.body.images_host6);
    Experience.create(newExperience, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            req.user.experiences.push(newlyCreated._id);
            req.user.save();
            res.redirect("/experiences");
        }
    });
})

//NEW - show form to create new experience
router.get("/new", middleware.isLoggedIn, function(req, res){
    // res.redirect('/experiences/5f147210782cdb6f50209042');
    res.render("experiences/new"); 
    // res.send("succeeded!")
});

// SHOW - show experience details
router.get("/:id", function (req, res){
    console.log("Show "+ req.params.id + " Routes succeeded!");
    // console.log(req.body);
    // console.log(req.params.id);
    // Experience.findById(req.params.id).populate("host").exec(function(err, foundExperience){
    Experience.findById(req.params.id).populate("comments").populate("host.id").exec(function(err, foundExperience){
        if (err) {
            console.log(err);
        }
        else {
            // console.log(foundExperience);
            // console.log(req.body);
            // console.log(res.body);
            res.render("experiences/show", {experience: foundExperience});
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkExperienceOwnship,  function(req, res){
    console.log("Edit " + req.params.id +  " Routes succeeded!");

    Experience.findById(req.params.id, function(err, foundExperience){
        if (err) {
            console.log(err);
        }
        else {
            res.render("experiences/edit", {experience: foundExperience});
        }
    });

});

// UPDATE route
router.put("/:id", middleware.checkExperienceOwnship, function(req, res){
    // console.log("PUT "+ req.params.id + " Routes succeeded!");
    // res.send("Update Route!");
    console.log(req.body.experience);
    var updatedExperience = {
        title : req.body.experience.title,
        price : parseInt(req.body.experience.price),
        location : req.body.experience.location,
        duration : parseInt(req.body.experience.duration),
        group : parseInt(req.body.experience.group),
        language : req.body.experience.language,
        description : req.body.experience.description,
        host: {
            id: req.user._id,
            name: req.user.name,
            thumbnail : req.user.thumbnail,
            selfintro: req.user.selfintro
        }
    }
    if(req.body.images_host1) updatedExperience.images_host.push(req.body.images_host1);
    if(req.body.images_host2) updatedExperience.images_host.push(req.body.images_host2);
    if(req.body.images_host3) updatedExperience.images_host.push(req.body.images_host3);
    if(req.body.images_host4) updatedExperience.images_host.push(req.body.images_host4);
    if(req.body.images_host5) updatedExperience.images_host.push(req.body.images_host5);
    if(req.body.images_host6) updatedExperience.images_host.push(req.body.images_host6);
    console.log(updatedExperience);
    Experience.findByIdAndUpdate(req.params.id, req.body.experience, {new: true} ,function(err, updatedExperience1){
        if (err) {
            console.log(err);
        }
        else{
            res.redirect("/experiences/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:id", middleware.checkExperienceOwnship, function(req, res){
    // res.send("Deleted!");
    Experience.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/experiences");
        }
        else{
            res.redirect("/experiences");
        }
    });
});

module.exports = router;