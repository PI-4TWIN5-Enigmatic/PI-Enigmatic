const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    realeted_donation: {            
        type: mongoose.Schema.Types.ObjectId, ref: 'donation' ,
      },
    read: {
        type: Boolean,
        default: false,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;