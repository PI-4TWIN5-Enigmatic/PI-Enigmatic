const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const user = require('./user');
const saltRounds = 10;

const associationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required : [true, 'Please add your fisrt name '],
            maxlength : 32
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
              validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
              },
              message: props => `${props.value} is not a valid email address!`
            }
          },
          location: {
            type: String,
            trim: true,
            required: true,
        },
        sector: {
            type: String,
            enum: ['Health ', 'Nature','Education','Poverty'],
            trim: true,
            required: true
        },
        validator: {
          type: String,
          trim: true,
          required: true
      },
      isActive: {
        type: Boolean,
        trim: true,
        default: false
         },
       

           isVerified: {
        type: Boolean,
        trim: true,
        default: false
         },
          foundationDate: {
            type: Date,
            required: true,
          },
          description: {
            type: String,
            trim: true,
            minlenght: [30 , "description should have at least 30 characters "],
            required: true
        },
        country: {
            type: String,
            trim: true,
            required : [true, 'Please add your country '],
        },
        webSite: {
            type: String,
            trim: true,
        },
        founder: {
            type: user,
            trim: true,
            required : [true, 'Please add the founder of the association '],
        },
        logoPicture: { type: Buffer },
        phone: { type: String , required: true , unique: true },
        password: { type: String, required : [true, 'Please add a correct password '], minlenght : [6, 'password should have at least 6 characters'] },
    }, { timestamps: true});

    associationSchema.pre('save', function(next) {
    const association = this;
  
    // Only hash the password if it has been modified or is new
    if (!association.isModified('password')) {
      return next();
    }
  
    bcrypt.hash(association.password, saltRounds, function(err, hash) {
      if (err) {
        return next(err);
      }
  
      association.password = hash;
      next();
    });
  });

module.exports = mongoose.model("Association" , associationSchema)
