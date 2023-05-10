const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema(
  {
    posterId: {type:ObjectId,ref:'User'},
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    posterIdassociation: {type:ObjectId,ref:'Association'},

   





    reports: {
      type: [{
      reason: { type: String, required: true },
      reportedBy: {type:ObjectId,ref:'User'},
      createdAt: { type: Date, default: Date.now }, 
    }],}
    ,
    posterpseudo:{
      type:String,
    },
    location: {
      type: String,
      trim: true,
      
  },
    posterlastname:{
      type:String,
    },
    
    posterphoto: {
      type: String,
    },

    // surveyQuestions: [{
    //   id: { type: Number, required: true },
    //   question: { type: String, required: true },
    //   type: { type: String, required: true },
    //   options: [{
    //     id: { type: Number, required: true },
    //     text: { type: String, required: true },
    //   }]
    // }],
    surveyQuestions: [{
      question: { type: String, required: true },
      questionerid: { type: ObjectId, ref: 'User' },
      options: [{
        optiontext: { type: String, required: true },
        votes: { type: Number, default: 0 },
        voters: [{ type: ObjectId, ref: 'User' }],
        votersass: [{ type: ObjectId, ref: 'Association' }],


      }],

    }],
    
    img: {
      type: [String],
    },

    
    
  

    video: {
      type: String,
    },
    pdf: {
      type: String,
      validate: {
        validator: function (value) {
          return /.pdf$/.test(value);
        },
        message: "Uploaded file is not a PDF",
      }},
    likers:  {     
       type: [
        {
          likerid:{type:ObjectId,ref:'User'},
         
        }
      ],
    },

    saved: {
      type: Boolean,
      default: false
    }
  ,
    comments: {
      type: [
        {
          text:{type: String},
          commenterid:{type:ObjectId,ref:'User'},
          commenterpseudo:{type :String},
          commenterphoto:{type :String},
          likerscomment:  {     
            type: [
             {
               commentlikerid:{type:ObjectId,ref:'User'},
              
             }
           ],
      
        }}
        
      ],
      
      timestamps: true,

      
      required: true,
      
      
    },

    
    
  },

  
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('post', PostSchema);