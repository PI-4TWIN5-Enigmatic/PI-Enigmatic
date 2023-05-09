const express = require('express')
const { RequestDonnation, UpdateDonation, getAllDonnation, getDonnation, deleteDonnation, Payment, getAllDonnations, getDonationTypes  } = require('../controllers/donation')
const router = express.Router()


router.post('/requestDonnation/:id', RequestDonnation)

router.post("/payment", Payment)

router.put('/updateDonation/:id', UpdateDonation)
router.get('/getAllDonnation', getAllDonnation)
router.get('/getAllDonnations', getAllDonnations)
router.get('/getDonnation/:id', getDonnation)
router.delete('/deleteDonnation/:id',deleteDonnation)
router.get('/stat-donation', getDonationTypes)

module.exports = router;