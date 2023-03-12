const User = require("../models/user")
const bcrypt = require('bcryptjs');

const jwt=require("jsonwebtoken")


exports.signup = async (req,res,next) =>{

    const {email} = req.body ;
    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({
            sucess: false,
            message: "Email already existy"
        })
    }
   try {
    const user = await User.create(req.body);
    res.status(201).json({
        sucess: true,
        user
        
    })
    
   } catch (error) {
    console.log(error);
    res.status(201).json({
        sucess: false,
        message: error.message
        
    })
   }
}

/* LOGGING IN */
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


//get list user 
exports.getListUser = async (req, res,next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    }catch(error) {
       res.status(404).json({message: error.message});
    }
}


//GET USER BY ID 
exports.getUser = async (req, res ) =>{
  try{
      const{id}=req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
  }catch(err){
    
          res.status(404).json({error:err.message});
  }
}


