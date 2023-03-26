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
          type:Array,
          default:[],
      },
      
      interesse :{
        type:Array,
        default:[],
    },

    typeEvent: {
      type: String,
      default: "FreeEvent",
      enum: ["FreeEvent", "PaidEvent"]
    },    

         },
     { timestamps: true});

   

module.exports = mongoose.model("Event" , eventSchema)
