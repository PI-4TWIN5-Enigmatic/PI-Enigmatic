const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema(
    { 
       location: {
            type: String,
            trim: true,
            required: true,
        },
        sector: {
            type: String,
            enum: ['Health', 'Nature','Education','Poverty'],
            trim: true,
            required: true
         },
        type: {
          type: String,
          enum: ['Money', 'Clothes', 'Blood', 'Food', 'Other'],
          trim: true,
          required: true
        },
        goal: {
          type: Number,
          required: true
        },
        
        isVerified: {
        type: Boolean,
        default: false
        },
        description: {
            type: String,
            trim: true,
            minlenght: [30 , "description should have at least 30 characters "],
            required: true
        },
        status: {
          type: String,
          enum: ['Pending', 'In Process', 'Completed'],
          default:'Pending',
          required: true,
          trim: true
      },
          date: {
            type: Date,
        required: true,
      },
      requester: {            
        type: mongoose.Schema.Types.ObjectId, ref: 'user' ,
      },
    picture: { type: String },
        
  },
  { timestamps: true });

  module.exports = mongoose.model('donation', donationSchema);