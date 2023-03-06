const express = require('express')
const router = express.Router()
const {signupAssociation} = require("../controllers/association")



router.post('/signupAssociation', signupAssociation)

module.exports = router;
