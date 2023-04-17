const notifications = require('../models/notifications')
const Donation = require('../models/donation')


exports.addNotifications = async (req, res) => {
    const requester = await Donation.findById({ _id: req.params.id })

    try {
        const notification = await notifications.create({...req.body,requester:requester.id}).then((doc) => {
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


exports.getAllNotifications = async (req, res) => {
    try {
        const data = await notifications.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

