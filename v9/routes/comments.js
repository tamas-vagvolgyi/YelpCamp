var express = require("express");
var router  = express.Router({mergeParams: true});      // mergeParams true helps to access the :id that we define in app.js
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: foundCampground});
        }
    })
});

// Comments CREATE

router.post("/", isLoggedIn, function(req, res){
    // Lookup campground using ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // Create new comment
            Comment.create(req.body.comment, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to the comment
                    newlyCreated.author.id = req.user._id;
                    newlyCreated.author.username = req.user.username;
                    // save comment
                    newlyCreated.save();
                    // Connect new comment to campground
                    foundCampground.comments.push(newlyCreated);
                    foundCampground.save();
                    // Redirect to the particular campground showpage
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            })
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