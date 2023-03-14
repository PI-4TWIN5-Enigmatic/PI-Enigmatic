
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
         
        },
        lastName: {
            type: String,
            trim: true,
         
        },
        email: {
            type: String,
          
            validate: {
              validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
              },
              message: props => `${props.value} is not a valid email address!`
            }
          },
        occupation: {
            type: String,enum: ['Student', 'Employee'],
            trim: true,
          
        },
        isActive: {
          type: Boolean,
        
          default: false
  
         
      },
      isBanned: {
        type: Boolean,
       
        default: false
  
       
    },
    googleId: {
      type: String,
      trim: true
    

     
  },
  secret: {
    type: String,
   
  

   
},
score: {
  type: Number,

},
specialUser: {
  type: Boolean,
  default: false

 
},
        sexe: { type: String, enum: ['Male', 'Female'] },
        phone: { type: String  },
        friends: { type: Number , default: 0},
        profilePicture: { type: Buffer },
        followedProfil : { type: Number ,  default: 0},
        followingProfil : { type: Number ,  default: 0},
        password: { type: String},
        role : { type: Number , default: 0}
    }, { timestamps: true});

userSchema.pre('save', function(next) {
    const user = this;
  
    // Only hash the password if it has been modified or is new
    if (!user.isModified('password')) {
      return next();
    }
  
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      if (err) {
        return next(err);
      }
  
      user.password = hash;
      next();
    });
  });

module.exports = mongoose.model("User" , userSchema)
