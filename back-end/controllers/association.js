const Association = require("../models/association")
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'islem.gharbi@esprit.tn',
      pass: 'ukvyhcpmnytcvnfp'
    }
  });

 

const bcrypt = require('bcryptjs');

const jwt=require("jsonwebtoken")


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
    const association = await Association.create(req.body).then((doc) => {
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

//get list association
exports.getListAssociation = async (req, res,next) => {
    try {
      const users = await Association.find();
      res.status(200).json(users);
    }catch(error) {
       res.status(404).json({message: error.message});
    }
}
<<<<<<< HEAD

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
=======
>>>>>>> 9dd69cabeb90cefe46b6d9d789f77a7479a92ea9
