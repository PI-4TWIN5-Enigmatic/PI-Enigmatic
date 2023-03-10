const Association = require("../models/association")
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'islem.gharbi@esprit.tn',
      pass: 'ukvyhcpmnytcvnfp'
    }
  });

 


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