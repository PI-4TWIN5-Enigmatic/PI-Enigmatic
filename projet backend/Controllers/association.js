const Association = require("../models/association")

const bcrypt = require('bcryptjs');

const jwt=require("jsonwebtoken")

exports.signupAssociation = async (req,res,next) =>{

    const {email} = req.body ;
    const associationExists = await Association.findOne({email});
   

    if(associationExists){
        return res.status(400).json({
            sucess: false,
            message: "Email already existy"
        })
    }
   try {
    const association = await Association.create(req.body);
    res.status(201).json({
        sucess: true,
        association
        
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