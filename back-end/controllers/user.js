const User = require("../models/user");
const OtpData =require ("../models/otp");
var bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'islem.gharbi@esprit.tn',
      pass: 'ukvyhcpmnytcvnfp'
    }
  });
  


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
    // check if user is banned
    if (user.isBanned)  return res.status(403).send({ success: false, error: "Your account has been banned" });
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.unbanUser = async (req, res) => {
  const { firstName } = req.body;

  // check if user exists in the database
  const user = await User.findOne({ firstName });
  if (!user) {
    return res.status(404).send({ success: false, error: "User not found" });
  }

  // check if user is already unbanned
  if (!user.isBanned) {
    return res
      .status(400)
      .send({ success: false, error: "User is already unbanned" });
  }

  // unban user
  user.isBanned = false;
  await user.save();

  res.status(200).json({ success: true, message: "User has been unbanned" });
};



exports. banUser = async (req, res) => {
  const { firstName } = req.body;

  // check if user exists in the database
  const user = await User.findOne({ firstName });
  if (!user) {
    return res.status(404).send({ success: false, error: "User not found" });
  }

  // check if user is already unbanned
  if (user.isBanned) {
    return res
      .status(400)
      .send({ success: false, error: "User is already banned" });
  }

  // ban user
  user.isBanned = true;
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



exports.forgetPassword = async (req , res , next)=>{
    const {email} =req.body;
    try{
        const oldUser = await User.findOne({email});
        if (!oldUser){
            return res.send("User not exist !")
        }
    }catch (error) {}
}


exports.emailSend = async (req , res , next )=>{

  try {
    // find the user with the given email address
    const user = await User.findOne({ email: req.body.email });
    res.send(user)
    // if no user is found, send an error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
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
    return res.status(200).json({ message: 'Code sent' });
  } catch (error) {
    // handle errors
    console.error(error);
  }
}




exports.changerPass =async (req,res)=>{
    let data =OtpData.find({email:req.body.email,code:req.body.optCode});
    const response ={}
    if(data){
      let currentTime= new Date().getTime;
      let diff=data.expiration-currentTime;
      if (diff<0){
        res.message='token expire'
        res.statusText='error'
        console.log('diff<0')
      }else{
        let user=await User.findOne({email:req.body.email})
        user.password=req.body.password;
        user.save();
        res.message='password changed succefully'
        res.statusText='success'
        console.log("changed")
      }

    }else{
      res.message='invalid otp'
      res.statusText='error'
      console.log("otp invalid")
    }
    res.status(200).json(response);
}



