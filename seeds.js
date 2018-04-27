const mongoose = require("mongoose");
//Import CampgroundScehma from campground.js
// "./"  referes to where we are now
const Campground = require("./models/campground");
const Comment = require("./models/comment");

//Define an array which have a few objects. Each one is a object and and has name, image and description 
//This is a data set for start and exactly what our models are expecting.
//Models has name, image and description. Then we have to loop through the data and create a campground for each one.
const data = [
    {
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description:"blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description:"blah blah blah"
    },
    {
        name: "Winter Mountain",
        image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104497f4c771a0eeb4b8_340.jpg",
        description:"blah blah blah"
    }
];


//Start by Removing all campgrounds. whipe everything out of the db. Wrap it in a function
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
        console.log("removed campgrounds!");
        //Add a few campground looping through the data.
        //Seed is gonna represent one of the object inside the array data
        data.forEach(function(seed){
            Campground.create(seed, function(err, onecamp){
                if(err){
                    console.log(err);
                } else {
                    console.log("added campground");
                    //Create comments on each newly created campground. Comments are all the same. So we are gonna end up  with three different posts
                    Comment.create({
                        comment:"This place is great, but I wish there was internet",
                        author:"Homer"
                    }, function(err, comment){ // This "comment" in the callback is the new comment we just created
                        if(err){
                            console.log(err);
                        } else {
                            //Once we created a comment, we then have to associated with the campground. Pushing a comment into the comments array in the campground
                            //We need a comments properety to Campground
                            onecamp.comments.push(comment);
                            onecamp.save();
                            console.log("Created new comments");
                            
                        }
                    }
                    );
                }
            });   
        });
        }
    });
}


//This code wil send the function out and will be stored inside the seedDB in app.js by  "seeDB = require("./seeds")"
module.exports = seedDB;