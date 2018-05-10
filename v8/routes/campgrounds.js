var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

// INDEX
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res){
    // Get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // Redirect to campgrounds
            res.redirect("/campgrounds");
        }
    })

});

// SHOW - Shows more info about a particular campground
router.get("/:id", function(req, res){
    // Find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){    // .populate.exec() is when we want to pass all the comments to the showpage
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // Render the show template of that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;