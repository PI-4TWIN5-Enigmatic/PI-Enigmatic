const Association = require("../models/association")
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'islem.gharbi@esprit.tn',
      pass: 'ukvyhcpmnytcvnfp'
    }
  });

 

const bcrypt = require('bcrypt');

const jwt=require("jsonwebtoken");
const User = require("../models/user");


exports.signupAssociation = async (req,res,next) =>{
  const {email} = req.body ;
  const {name} = req.body ;
  const {validator} = req.body ;
  var id;
  const associationExists = await Association.findOne({email});
  if(associationExists){
      return res.status(400).json({
          sucess: false,
          message: "Email already existy"
      })
  }
  
 try {
  console.log(req.user)
  const association = await Association.create({...req.body,founder:req.user.id}).then((doc) => {
 id = doc._id;

   
    });
  res.status(201).json({
      sucess: true,
      association
      
  })
  const message = {
      from: 'islem.gharbi@esprit.tn',
      to: 'islem.gharbi3000@gmail.com',
      subject: 'Verifier association',
      html:`<h1>Good morning ,</h1> \n  <p>
      A new association asked for permission to be verified <br> \n
      <b>Name : </b> ${name} <br>
      <b>Email : </b> ${email} <br>
      <b>Validator : </b> ${validator} <br>
      If you want to verify this association press this button <br>
      <a href="http://localhost:8000/association/verifier/${id}">Verifier</a>

      </p>`
  }
  transport.sendMail(message);
  
 } catch (error) {
  console.log(error);
  res.status(201).json({
      sucess: false,
      message: error.message
      
  })
 }
}
/* LOGGING IN */
exports.loginassociation = async (req, res) => {
    try {
      const { email, password } = req.body;
      const association = await Association.findOne({ email: email });
      if (!association) return res.status(400).json({ msg: "association does not exist. " });
  
      const isMatch = await bcrypt.compare(password, association.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: association._id }, process.env.JWT_SECRET);
      delete association.password;
      res.status(200).json({ token, association });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



  //GET association BY ID 
exports.getAssociation = async (req, res ) =>{
  try{
      const{id}=req.params;
      const association = await Association.findById(id);
      res.status(200).json(association);
  }catch(err){
    
          res.status(404).json({error:err.message});
  }
}

//get list association
exports.getListAssociation = async (req, res,next) => {
    try {
      const users = await Association.find();
      res.status(200).json(users);
    }catch(error) {
       res.status(404).json({message: error.message});
    }
}

exports.verifiedAsso = async (req,res,next)=>{
    const associationId = req.params.id;
    Association.findByIdAndUpdate(associationId, { isVerified: true })
    .then(() => {
        res.send('Account updated successfully');
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred while updating the account');
      });

}

exports.UpdateAssociation = async (req, res) => {
  try {
    
      const data = await Association.findOneAndUpdate(
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

  const association = await Association.findById({ _id: req.params.id });
 
  // check if user account is already deactivated
  if (!association.isActive) {
    return res
      .status(400)
      .send({ success: false, error: "association account is already deactivated" });
  } else {
    association.isActive = false;
    await association.save();
    res.status(200).json({ success: true, message: "association account has been deactivated" });
  }  
};

exports.activateAccount = async (req, res) => {
  
  const association = await Association.findById({ _id: req.params.id });
 
  // check if user account is already deactivated
  if (association.isActive) {
    return res
      .status(400)
      .send({ success: false, error: "association account is already activated" });
  } else {
    association.isActive = true;
    await association.save();
    res.status(200).json({ success: true, message: "association account has been activated" });
  }

  // ban user
  
};


exports.getAssociationsByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    const associations = [];

    for (const id of ids) {
      const asso = await Association.findById(id);

      if (asso === null) {
        console.log(`association ${id} not found in database`);
        continue;
      }

      associations.push(asso);
    }

    res.status(200).json(associations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



exports.followAssociation = async (req, res) => {
  const userId = req.params.userId;
  const targetAssociationId = req.body.targetAssociationId;

  try {
    const user = await User.findById(userId);
    const targetAssociation = await Association.findById(targetAssociationId) ;
   
    if (!user.followingAssociation.includes(targetAssociation._id)) {
      user.followingAssociation.push(targetAssociation._id);
      await user.save();

      targetAssociation.followedProfil.push(user._id);
      await targetAssociation.save();

      return res.send(`${user.firstName} is now following ${targetAssociation.name}`);
    } else {
      return res.send(`${user.firstName} is already following ${targetAssociation.name}`); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};




exports.unfollowAssociation = async (req, res) => {
  const userId = req.params.userId;
  const targetAssociationId = req.body.targetAssociationId;

  try {
    const user = await User.findById(userId);
    const targetAssociation = await Association.findById(targetAssociationId) ;
    
    if (user.followingAssociation.includes(targetAssociation._id)) {
    
      user.followingAssociation.pull(targetAssociation._id);
      await user.save();

      targetAssociation.followedProfil.pull(user._id);
      await targetAssociation.save();

       return res.send(`${user.firstName} has unfollowed ${targetAssociation.name}` );
    } else {
     return  res.send( `${user.firstName} is not following ${targetAssociation.name}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};