const notifications = require('../models/notifications')
const Donation = require('../models/donation')
const Association = require('../models/association');



exports.addNotifications = async (req, res) => {
    const requester = await Donation.findById({ _id: req.params.id })

    try {
        if (!requester) {
            throw new Error("don n'a pas été trouvé")
        }

        const notification = await notifications.create({related_donation : req.params.id,
                                                        read: false
        }).then((doc) => {
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
      const association = await Association.findOne({ founder: req.params.id });
      if (!association) {
        return res.status(400).json({ message: "L'utilisateur n'a pas d'association" });
      }
        const data = await notifications.find().populate('related_donation');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getNotificationDetails = async (req, res) => {
    try {
      const notification = await notifications.findById({ _id: req.params.id }).populate('related_donation');
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

exports.deleteNotification = async (req, res) => {
    try {
      const notification = await notifications.findByIdAndDelete({ _id: req.params.id });
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
exports.deleteNotificationwith = async (req, res) => {
    try {
      const notification = await notifications.findOneAndDelete({ related_donation: req.params.id });
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  