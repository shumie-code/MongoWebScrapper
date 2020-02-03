var  mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new UserSchema Object
// This is similar to a Sequelize model
var CommentSchema = new Schema ({
    // headline is required and of type string
    name: {
        type: String,
    },

    // Summary is required and of type String
    Body: {
        type: String,
        required: true
    },
    // 'note' is an object that stores the note id
    // The ref property links the ObjectID to the note Model
    // This allows us to populate the article with an associated note
  
});
// This creates our model from the above schema, using mongooses model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Article MODEL
module.exports = Comment;