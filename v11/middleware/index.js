var Campground      = require("../models/campground");
var Comment         = require("../models/comment");
var middlewareObj   = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                // does the user own the campground
                if(foundCampground.author.id.equals(req.user._id)){  // Not using === because one is an object the other one is a string, hence we use the mongoose .equals() function
                    next();           
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");  // redirect the user to where they came from
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // does the user own the comment
                if(foundComment.author.id.equals(req.user._id)){  // Not using === because one is an object the other one is a string, hence we use the mongoose .equals() function
                    next();           
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");  // redirect the user to where they came from
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


module.exports = middlewareObj;