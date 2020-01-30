var  mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new UserSchema Object
// This is similar to a Sequelize model
var ArticlesSchema = new Schema ({
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
    // URL is required and type of string
    summary: {  
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    // 'note' is an object that stores the note id
    // The ref property links the ObjectID to the note Model
    // This allows us to populate the article with an associated note
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});
// This creates our model from the above schema, using mongooses model method
var Article = mongoose.model("Article", ArticlesSchema);

// Export the Article MODEL
module.exports = Article;