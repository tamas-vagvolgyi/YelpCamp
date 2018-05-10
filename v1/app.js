var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1482463084673-98272196658a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=457b7840cb35f335c04c8d37a7210a4d&auto=format&fit=crop&w=2550&q=80"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=2551&q=80"},
    {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1460899162311-d63278c9cf9d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc130160575a91709889b22c4d718ed4&auto=format&fit=crop&w=2550&q=80"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1482463084673-98272196658a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=457b7840cb35f335c04c8d37a7210a4d&auto=format&fit=crop&w=2550&q=80"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=2551&q=80"},
    {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1460899162311-d63278c9cf9d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc130160575a91709889b22c4d718ed4&auto=format&fit=crop&w=2550&q=80"},
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1482463084673-98272196658a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=457b7840cb35f335c04c8d37a7210a4d&auto=format&fit=crop&w=2550&q=80"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=2551&q=80"},
    {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1460899162311-d63278c9cf9d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc130160575a91709889b22c4d718ed4&auto=format&fit=crop&w=2550&q=80"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    // Get data from form
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    // Add to campgrounds
    campgrounds.push(newCampground);
    // Redirect to campgrounds
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});