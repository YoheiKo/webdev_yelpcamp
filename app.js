var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp"); // after slash of the local host name the db which doesn't exist yet.
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SHEMA SETUP

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

//COMPILE IT INTO MODEL

var Campground = mongoose.model("Campground", campgroundSchema); //"Campground" is a sigular name of the model 

/*Campground.create(
    {
        name:"Granite Hill2",
        image:"https://cdn.stocksnap.io/img-thumbs/280h/AD4M0GTYS8.jpg",
        description:"This is a huge granite hill. No bathrooms."
        
    },
    function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGRPUND:");
            console.log(campground);
        }
    });*/

var campgrounds = [
  {name:"Salmon Creek", image:"https://image.shutterstock.com/display_pic_with_logo/2547541/358158596/stock-photo-camping-and-tent-under-the-pine-forest-in-sunset-at-north-of-thailand-358158596.jpg"},
  {name:"Granite Hill", image:"https://cdn.stocksnap.io/img-thumbs/280h/AD4M0GTYS8.jpg"},
  {name:"Mountain Goat's Rest", image:"https://cdn.stocksnap.io/img-thumbs/280h/PTERNSNX0F.jpg"},
  {name:"Salmon Creek", image:"https://image.shutterstock.com/display_pic_with_logo/2547541/358158596/stock-photo-camping-and-tent-under-the-pine-forest-in-sunset-at-north-of-thailand-358158596.jpg"},
  {name:"Granite Hill", image:"https://cdn.stocksnap.io/img-thumbs/280h/AD4M0GTYS8.jpg"},
  {name:"Mountain Goat's Rest", image:"https://cdn.stocksnap.io/img-thumbs/280h/PTERNSNX0F.jpg"},
  {name:"Salmon Creek", image:"https://image.shutterstock.com/display_pic_with_logo/2547541/358158596/stock-photo-camping-and-tent-under-the-pine-forest-in-sunset-at-north-of-thailand-358158596.jpg"},
  {name:"Granite Hill", image:"https://cdn.stocksnap.io/img-thumbs/280h/AD4M0GTYS8.jpg"},
  {name:"Mountain Goat's Rest", image:"https://cdn.stocksnap.io/img-thumbs/280h/PTERNSNX0F.jpg"}
];

app.get("/", function(req,res){
   res.render("landing"); 
});

//INDEX  - show all campgrounds
app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err, allcampgrounds){
       if(err){
           console.log(err);
       } else {
            res.render("index", {campgrounds:allcampgrounds});       
       }
    });
    
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    /*res.send("You hit the POST route.");*/
   //get data from form and add to newCampground object
   var name = req.body.name; //grab name from the form
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   /*campgrounds.push(newCampground);*/
   //create a new campground and save it to a DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds"); /*default is a GET request*/        
       }
   });
});

//NEW - shows form to create new campground - We need two routes in order to send post request, 
//one to show the form and another to submit
app.get("/campgrounds/new", function(req, res){ //This route shuold show the form that send information to /campgrounds POST route
    res.render("new.ejs");
});

//SHOW - show more info about the item. SHOW route has an ID inside of the url
//////WE NEED TO BE CAREFUL THAT "camgrounds/:id" COMES AFTER "campgrounds/new"
app.get("/campgrounds/:id", function(req ,res){
//find the campground with provided ID. The id is inside req.params.id
    Campground.findById(req.params.id, function(err, foundcampground){
        if(err){
            console.log(err);
        }   else {
                res.render("show", {campground: foundcampground});        
        } 
    });
    
});

app.listen(process.env.PORT, process.env.IP,function(){
   console.log("The App server has started!"); 
}); 
