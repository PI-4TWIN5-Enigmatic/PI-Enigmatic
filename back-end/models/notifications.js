const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    related_donation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'donation',
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
    }, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema)