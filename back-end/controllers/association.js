const Association = require("../models/association")


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
//get list association
exports.getListAssociation = async (req, res,next) => {
    try {
      const users = await Association.find();
      res.status(200).json(users);
    }catch(error) {
       res.status(404).json({message: error.message});
    }
}