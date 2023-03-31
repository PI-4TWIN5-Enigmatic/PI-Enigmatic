const express = require('express')
const { RequestDonnation, UpdateDonation, getAllDonnation, getDonnation } = require('../controllers/donation')
const router = express.Router()


router.post('/requestDonnation/:id', RequestDonnation)
router.put('/updateDonation/:id', UpdateDonation)
router.get('/getAllDonnation', getAllDonnation)
router.get('/getDonnation/:id',getDonnation)

module.exports = router;