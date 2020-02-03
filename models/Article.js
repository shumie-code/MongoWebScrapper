var  mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new UserSchema Object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
    // headline is required and of type string
    title: {
        type: String,
        required: true
    },

    // Summary is required and of type String
    link: {
        type: String,
        required: true
    },
    // 'note' is an object that stores the note id
    // The ref property links the ObjectID to the note Model
    // This allows us to populate the article with an associated note
    comment: [
        {
        type: Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});
// This creates our model from the above schema, using mongooses model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article MODEL
module.exports = Article;