const Donation = require('../models/donation')
const Notification = require('../models/notifications')
const User = require('../models/user')
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_KEY);


exports.Payment = async (req, res) => {
  try {
    const  priceId  = req.body.data.priceId;
    const somm = req.body.data.amount;
    const idUser = req.body.data.idUser;

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
       name: "Donation",
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
      success_url: `http://localhost:3000/HomePage/${idUser}`,
      cancel_url: "http://localhost:3000/failed",
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
        let id;
        const donation = await Donation.create({...req.body,requester:requester.id}).then((doc) => {
        id = doc._id
        })

        

        res.status(201).json({
        sucess: true,
        donationId: id

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
        const data = await Donation.find({ isVerified: true })
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getAllDonnations = async (req, res) => {
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

exports.getDonationTypes = async (req, res, next) => {
  try {
    const donations = await Donation.find();
    const donationCounts = donations.reduce((counts, donation) => {
      const type = donation.type;
      counts[type] = counts[type] ? counts[type] + 1 : 1;
      return counts;
    }, {});
    res.status(200).json(donationCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

