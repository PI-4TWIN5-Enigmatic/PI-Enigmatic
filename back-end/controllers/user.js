const User = require("../models/user");
const OtpData =require ("../models/otp");
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'islem.gharbi@esprit.tn',
      pass: 'ukvyhcpmnytcvnfp'
    }
  });

  


const jwt=require("jsonwebtoken")


exports.uploads = async (req,res) => {
  const { file} = req ; 
  res.send({
    file: file.ori
  })
}

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

    let otpcode= Math.floor((Math.random()*10000)+1)
    let otpData=new OtpData({
      email:req.body.email,
      code:otpcode,
      expiration:new Date().getTime()+300*1000
    })
    let otpResponse= await otpData.save();
    console.log("success")

    // create the email message
    const message = {
      from: 'islem.gharbi@esprit.tn',
      to: user.email,
      subject: 'Validate your account',
      html:`<h1>Good morning,</h1> \n
      <p> We have received a request to validate your  account.please write 
      the code below: \n </p> 
      <h2>${otpcode}</h2>
     
     
      `}
    await transport.sendMail(message);

    

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

exports.UpdateUser = async (req, res) => {
  try {
      const data = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    
  } catch (error) {
    console.log(error.message);
  }
};

exports.deactivateAccount = async (req, res) => {

  const user = await User.findById({ _id: req.params.id });
 
  // check if user account is already deactivated
  if (!user.isActive) {
    return res
      .status(400)
      .send({ success: false, error: "User account is already deactivated" });
  } else {
    user.isActive = false;
    await user.save();
    res.status(200).json({ success: true, message: "User account has been deactivated" });
  }  
};

exports.activateAccount = async (req, res) => {
  
  const user = await User.findById({ _id: req.params.id });
 
  // check if user account is already deactivated
  if (user.isActive) {
    return res
      .status(400)
      .send({ success: false, error: "User account is already activated" });
  } else {
    user.isActive = true;
    await user.save();
    res.status(200).json({ success: true, message: "User account has been activated" });
  }

  // ban user
  
};



/* LOGGING IN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
   
    // check if user is banned
    if (user.isBanned > new Date()) {
      return res.status(403).send({ success: false, error: "Your account has been banned" });
    }  
     const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin}, process.env.JWT_SECRET);
     delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  

   
  
};
exports.unbanUser = async (req, res) => {
  const { userId } = req.body;

  // check if user exists in the database
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  if (!user) {
    return res.status(404).send({ success: false, error: "User not found" });
  }

  // check if user is already unbanned
  if (user.isBanned == null || user.isBanned < new Date()) {
    return res
      .status(400)
      .send({ success: false, error: "User is already unbanned" });
  }

  // unban user
  user.isBanned = null;
  await user.save();

  res.status(200).json({ success: true, message: "User has been unbanned" });
};

exports. banUser = async (req, res) => {
  const { userId, banDate } = req.body;

  // check if user exists in the database
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  if (!user) {
    return res.status(404).send({ success: false, error: "User not found" });
  }
  console.log(banDate);
  // ban user
  user.isBanned = new Date(banDate);
  await user.save();

  res.status(200).json({ success: true, message: "User has been banned" });
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




exports.emailSend = async (req , res , next )=>{
 
  try {
    // find the user with the given email address
    const user = await User.findOne({ email:req.body.emailVerif });
   
    // if no user is found, send an error response
    if (!user) {
      return res.send("User not exist !")
     
    }

   
    let otpcode= Math.floor((Math.random()*10000)+1)
    let otpData=new OtpData({
      email:req.body.emailVerif,
      code:otpcode,
      expiration:new Date().getTime()+300*1000
    })
    let otpResponse= await otpData.save();
    console.log("success")




    // create the email message
    const message = {
      from: 'islem.gharbi@esprit.tn',
      to: user.email,
      subject: 'Password Reset Request',
      html:`<h1>Good morning,</h1> \n
      <p> We have received a request to reset the password associated with 
      your account. To proceed with resetting your password, please write 
      the code below: \n </p> 
      <h2>${otpcode}</h2>
     
     
      <p> If you did not make this request, please ignore this email and
      your password will remain unchanged. \n Thank you,</p>`}

    // send the email
    
    await transport.sendMail(message);
    // send a success response
    return res.send("Code sent to your email !")
  } catch (error) {
    // handle errors
    console.error(error);
  }
}




exports.changerPass =async (req,res)=>{
  const data = await OtpData.findOne({email:req.body.email,code:req.body.optCode});
  try{
  if(data){
    const now = new Date().getTime();
    let diff=data.expiration.getTime();
    let difference = diff-now

    if (difference < 0){
      res.message='token expire'
      res.statusText='error'
      return res.send("opt expired !")
      
      }else{
      let user=await User.findOne({email:req.body.email})
      user.password=req.body.password;
      user.save();
      res.message='password changed succefully'
      res.statusText='success'
      
      console.log("changed")
      return res.send("Password changed successfully !")
    }

  }else{
    res.message='invalid otp'
    res.statusText='error'
    
    return res.send("Invalid OTP code!")
}
  }catch (error) {
    // handle errors
    console.error(error);
  }
}

// Multer configurations
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}


let upload = multer({ storage, fileFilter }).single('receipt');

exports.confirmationemail =async (req,res)=>{
  const data = await OtpData.findOne({email:req.body.email,code:req.body.optCode});
  try{
  if(data){
    const now = new Date().getTime();
    let diff=data.expiration.getTime();
    let difference = diff-now

    if (difference < 0){
      res.message='token expire'
      res.statusText='error'
      return res.send("opt expired !")
      
      }else{
      let user=await User.findOne({email:req.body.email})
      user.isVerified=true;
      user.save();
      res.message='password changed succefully'
      res.statusText='success'
      
      console.log("changed")
      return res.send("Account verified")
    }

  }else{
    res.message='invalid otp'
    res.statusText='error'
    
    return res.send("Invalid OTP code!")
}
  }catch (error) {
    // handle errors
    console.error(error);
  }
}

