const Donation = require('../models/donation')
const User = require('../models/user')
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_KEY);


exports.Payment = async (req, res) => {
  try {
    const  priceId  = req.body.data.priceId;
    const  somm  = req.body.data.amount;

    if (!priceId) {
      return res.status(400).json({ error: "Price ID is required" });
    }
   const price = await stripe.prices.create({
     unit_amount: somm * 100,
     currency: "eur",
     recurring: {
       interval: "month",
     },
     product_data: {
       name: "Thank your for your donation",
     },
   });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:3000/profile/64121f904790f49045f2b1d5",
      cancel_url: "http://localhost:3000/jdsnc",
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

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

exports.deleteDonnation = async (req, res) => {
  try {
    const data = await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  
}