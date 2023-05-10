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

exports.Increment = async (req,res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    // Increment the views count
    reel.views++;
    await reel.save();

    return res.status(200).json({ message: 'Views incremented successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

exports.addLike = async (req,res) => {
  try {
    const reel = await Reel.findById(req.params.idreel);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    // Vérifiez si l'utilisateur a déjà aimé le reel
    const userId = req.params.iduser;
    const hasLiked = reel.likes.includes(userId);

    if (hasLiked) {
      // L'utilisateur a déjà aimé le reel, supprimez le like
      const index = reel.likes.indexOf(userId);
      reel.likes.splice(index, 1);
    } else {
      // L'utilisateur n'a pas encore aimé le reel, ajoutez le like
      reel.likes.push(userId);
    }

    await reel.save();

    return res.status(200).json({ message: 'Like updated successfully', likes: reel.likes.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}


exports.getReelLikes = async (req, res) => {
  try {
    const reelId = req.params.id;
    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    const likesCount = reel.likes.length;
    return res.status(200).json({ likes: likesCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

