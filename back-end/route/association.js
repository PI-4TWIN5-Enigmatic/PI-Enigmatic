const express = require('express')
const router = express.Router()
const {signupAssociation ,activateAccount,deactivateAccount,UpdateAssociation,getListAssociation, verifiedAsso, loginassociation, getAssociation} = require("../controllers/association")
const{verifyToken}=require ("../middleware/auth")


router.post('/signupAssociation',verifyToken, signupAssociation)
router.post('/loginassociation', loginassociation)
router.put('/UpdateAssociation/:id', UpdateAssociation)
router.post('/deactivateAccount/:id', deactivateAccount)
router.post('/activateAccount/:id', activateAccount)

  //get list association
  router.get('/getAll',getListAssociation)
  router.get('/get/:id',getAssociation)

  router.get('/verifier/:id',verifiedAsso)

module.exports = router;