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
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    occupation: {
      type: String, enum: ['Student', 'Employee'],
      trim: true,
      maxlength: 32
    },
    isActive: {
      type: Boolean,
      default: true


    },
    isBanned: Date,

    
    googleId: {
      type: String,
      trim: true



    },
    secret: {
      type: String,





    },
    recaptcha: {
      type: String
    },
    score: {
      type: Number,
      default: 0


    },
    specialUser: {
      type: Boolean,
      default: false


    },
    likes: {
      type: [String]
    },
    sexe: { type: String, enum: ['Male', 'Female'] },
    phone: { type: String },
    isVerified: {
      type: Boolean,

      default: false


    },
    friends: { type: Number, default: 0 },
    profilePicture: { type: String },
    followedProfil: [{ type: mongoose.Types.ObjectId, ref:"User" }],
    followingProfil: [{ type: mongoose.Types.ObjectId, ref:"User" }],
    password: { type: String },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },
    isAdmin: { Boolean, default: false } 
  }, { timestamps: true });

userSchema.pre('save', function (next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema)
