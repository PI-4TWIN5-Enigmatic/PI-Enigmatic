const express = require('express')
const { RequestDonnation, UpdateDonation, getAllDonnation, getDonnation, deleteDonnation, Payment  } = require('../controllers/donation')
const router = express.Router()


router.post('/requestDonnation/:id', RequestDonnation)

router.post("/payment", Payment)

router.put('/updateDonation/:id', UpdateDonation)
router.get('/getAllDonnation', getAllDonnation)
router.get('/getDonnation/:id', getDonnation)
router.delete('/deleteDonnation/:id',deleteDonnation)

module.exports = router;