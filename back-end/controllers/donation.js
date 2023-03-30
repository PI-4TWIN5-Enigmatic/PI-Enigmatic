const Donation = require('../models/donation')
const User = require('../models/user')


exports.RequestDonnation = async (req, res) => {
    const requester = await User.findById({ _id: req.params.id })

    try {
        const donation = await Donation.create({...req.body,requester:requester.id}).then((doc) => {
        id = doc._id
        })
        res.status(201).json({
        sucess: true
    })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            sucess: false,
            message: error.message,
        })  
    }

}

exports.UpdateDonation = async (req, res) => {
    try {
      const data = await Donation.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    
  } catch (error) {
    console.log(error.message);
  }
}
exports.getAllDonnation = async (req, res) => {
    try {
        const data = await Donation.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getDonnation = async (req, res) => {
    try{
      const data = await Donation.findById(req.params.id);
      res.status(200).json(data);
  }catch(err){
    res.status(400).json({error:err.message});
  }
}