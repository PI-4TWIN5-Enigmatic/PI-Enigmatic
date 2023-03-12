const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
           required : [true, 'Please add your fisrt name '],
            maxlength : 32
        },
        lastName: {
            type: String,
            trim: true,
          required : [true, 'Please add your last name '],
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
        occupation: {
            type: String,enum: ['Student ', 'Employee'],
            trim: true,
           required : [true, 'Please add your occupation '],
            maxlength : 32
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
  type: number,

},
specialUser: {
  type: Boolean,
  default: false

 
},
        sexe: { type: String, enum: ['Male', 'Female'] },
        phone: { type: String  },
       phone: { type: String , required: true , unique: true },
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
