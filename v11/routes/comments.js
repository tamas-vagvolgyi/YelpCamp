var express = require("express");
var router  = express.Router({mergeParams: true});      // mergeParams true helps to access the :id that we define in app.js
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: foundCampground});
        }
    })
});

// Comments CREATE

router.post("/", middleware.isLoggedIn, function(req, res){
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

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});



module.exports = router;