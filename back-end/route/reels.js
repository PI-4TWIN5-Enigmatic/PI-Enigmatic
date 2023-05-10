const express = require('express')
const { addReel, getReels, deleteReel, Increment, addLike, getReelLikes } = require('../controllers/reels');

const router = express.Router()




router.post('/:id', addReel);
router.get('/getAll', getReels);
router.delete('/delete/:id',deleteReel)
router.post('/increment/:id',Increment)
router.post('/like/:idreel/:iduser', addLike);
router.get('/affichage/:id',getReelLikes)


module.exports = router;