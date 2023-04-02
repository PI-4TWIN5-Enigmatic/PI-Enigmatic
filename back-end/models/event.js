const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema(
    {
        nameEvent: {
            type: String,
            trim: true,
            maxlength : 32
        },
       
          
          locationEvent: {
            type: String,
            trim: true,
            
        },


     
          priceEvent: {
            type: String,
            trim: true,
        },
      
          dateEvent: {
            type: Date,
          },

          descriptionEvent: {
            type: String,
            trim: true,
            minlenght: [30 , "description should have at least 30 characters "],
        },
    

        organisateurEvent: {
            
            type: String ,
         },

        eventPicture: { type: String },

        participants :{
           type: Map, of: Boolean, default: new Map() ,
      },
      
      interested :{
        type: Map, of: Boolean, default: new Map() ,
    },
    
    reviews : {
      type: [
        {
          reviewerId:String,
          reviewerPseudo: String,
          reviewerPhoto: String,
          review: String,
          emoji:String,
          rating:Number,
          timestamp: Number,
        }
      ],
    },   
    
    attendeesList: {
            
      type: Map, of: Boolean, default: new Map() ,
   },

   partnersList:{
    type: Map, of: Boolean, default: new Map() ,

   },
    

    typeEvent: {
      type: String,
      default: "Free Event",
      enum: ["Free Event", "Paid Event"]
    },    



         },
     { timestamps: true});

   

module.exports = mongoose.model("Event" , eventSchema)
