const User = require("../models/user")


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

//get list user 
exports.getListUser = async (req, res,next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    }catch(error) {
       res.status(404).json({message: error.message});
    }
}