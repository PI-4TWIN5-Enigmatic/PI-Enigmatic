const mongoose = require('mongoose');
const { Schema } = mongoose;

const reelSchema = new Schema({
  reelUrl: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  views: {
    type: Number,
    default: 0,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
}, { timestamps: true });

const Reel = mongoose.model('Reel', reelSchema);

module.exports = Reel;
