const express = require('express')
const { addReel, getReels, deleteReel } = require('../controllers/reels');

const router = express.Router()




router.post('/:id', addReel);
router.get('/getAll', getReels);
router.delete('/delete/:id',deleteReel)


module.exports = router;