const express = require('express')
const router = express.Router()
const {signupAssociation ,activateAccount,deactivateAccount,UpdateAssociation,getListAssociation, verifiedAsso, loginassociation} = require("../controllers/association")

router.post('/signupAssociation', signupAssociation)
router.post('/loginassociation', loginassociation)
router.put('/UpdateAssociation/:id', UpdateAssociation)
router.post('/deactivateAccount/:id', deactivateAccount)
router.post('/activateAccount/:id', activateAccount)

  //get list association
  router.get('/getAll',getListAssociation)

  router.get('/verifier/:id',verifiedAsso)

module.exports = router;
