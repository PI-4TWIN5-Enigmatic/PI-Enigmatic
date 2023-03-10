const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const {signupAssociation , getListAssociation, verifiedAsso, } = require("../controllers/association")
=======
const {signupAssociation , getListAssociation,loginassociation} = require("../controllers/association")
>>>>>>> 9dd69cabeb90cefe46b6d9d789f77a7479a92ea9



router.post('/signupAssociation', signupAssociation)
router.post('/loginassociation', loginassociation)


  //get list association
  router.get('/getAll',getListAssociation)

  router.get('/verifier/:id',verifiedAsso)

module.exports = router;
