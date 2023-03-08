const express = require('express')
const router = express.Router()
const {signupAssociation , getListAssociation,loginassociation} = require("../controllers/association")



router.post('/signupAssociation', signupAssociation)
router.post('/loginassociation', loginassociation)


  //get list association
  router.get('/getAll',getListAssociation)

module.exports = router;
