const mongoose = require("mongoose");
// SHEMA SETUP

const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

//COMPILE IT INTO MODEL and EXPORT
//When we require this file, we will be getting the model 
module.exports = mongoose.model("Campground", campgroundSchema); //"Campground" is a sigular name of the model 