var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")
    


mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

/*Campground.create(
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=2551&q=80",
        description: "This is a huge Granite Hill. No bathrooms, no water, beautiful Granite"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("Newly created campground:");
            console.log(campground);
        }
    });
*/


app.get("/", function(req, res){
    res.render("landing");
});


// INDEX
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/:id", function(req, res){
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

// =============== //
// COMMENTS ROUTES //
// =============== //

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: foundCampground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});