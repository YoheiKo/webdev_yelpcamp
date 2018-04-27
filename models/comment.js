const mongoose = require("mongoose");

const commentSchema =  mongoose.Schema({
    comment: String,
    author: String
});

//Compile Schema into a model and export the model
module.exports = mongoose.model("Comment", commentSchema);