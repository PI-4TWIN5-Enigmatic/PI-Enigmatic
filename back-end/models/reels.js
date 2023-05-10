const mongoose = require('mongoose');
const { Schema } = mongoose;

const reelSchema = new Schema({
  reelUrl: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

const Reel = mongoose.model('Reel', reelSchema);

module.exports = Reel;
