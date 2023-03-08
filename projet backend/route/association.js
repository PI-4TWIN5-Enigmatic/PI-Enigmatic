const express = require('express')
const router = express.Router()
const {signupAssociation,loginassociation } = require("../controllers/association")



router.post('/signupAssociation', signupAssociation)
router.post('/loginassociation', loginassociation)




module.exports = router;

