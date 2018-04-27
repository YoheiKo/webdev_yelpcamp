const mongoose = require("mongoose");
// SHEMA SETUP

const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   //Add property here called comments. It is goint to be an array. objectId reference to campground schema
   //What we are saying here is Comments property should be an array of commentIDs
   //We are not embeding actual comments here. We are embeding reference to the comments.
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref:"Comment" //"Comment" is the name of the model
      }   
   ]
});

//COMPILE IT INTO MODEL and EXPORT
//When we require this file, we will be getting the model 
module.exports = mongoose.model("Campground", campgroundSchema); //"Campground" is a sigular name of the model 