const Reel = require('../models/reels')



exports.getReels = async (req, res) => {
    try {
      const reels = await Reel.find();
  
      res.status(200).json({
        success: true,
        reels,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


exports.addReel = async (req, res) => {
const { reelUrl } = req.body;
const ownerId = req.params.id;

try {
    const newReel = await Reel.create({
    reelUrl,
    owner: ownerId,
    read: false,
    });

    res.status(201).json({
    success: true,
    reel: newReel,
    });
} catch (error) {
    console.log(error.message);
    res.status(500).json({
    success: false,
    message: error.message,
    });
}
};

exports.deleteReel = async (req, res) => {
    try {
      const reelId = req.params.id;
      const reel = await Reel.findById(reelId);
  
      if (!reel) {
        return res.status(404).json({ success: false, message: "Reel not found." });
      }
  
      await Reel.deleteOne({ _id: reelId });
      return res.status(200).json({ success: true, message: "Reel deleted successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }