const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: ObjectId,
      ref:"USER"
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    posterpseudo:{
      type:String,
    },

    posterlastname:{
      type:String,
    },
    
    posterphoto: {
      type: String,
    },

    img: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          text:{type: String},
          commenterid:{type:ObjectId},
          commenterpseudo:{type :String},
          commenterphoto:{type :String},
        }
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('post', PostSchema);