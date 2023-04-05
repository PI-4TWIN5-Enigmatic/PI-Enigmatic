const express = require('express')
const { RequestDonnation, UpdateDonation, getAllDonnation, getDonnation, deleteDonnation } = require('../controllers/donation')
const router = express.Router()


router.post('/requestDonnation/:id', RequestDonnation)
router.put('/updateDonation/:id', UpdateDonation)
router.get('/getAllDonnation', getAllDonnation)
router.get('/getDonnation/:id', getDonnation)
router.delete('/deleteDonnation/:id',deleteDonnation)

module.exports = router;