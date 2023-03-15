const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const {signupAssociation , getListAssociation, verifiedAsso, loginassociation, getAssociation} = require("../controllers/association")


=======
const {signupAssociation ,activateAccount,deactivateAccount,UpdateAssociation,getListAssociation, verifiedAsso, loginassociation} = require("../controllers/association")
>>>>>>> 896e70ea4b01d8e3d39955a00acd864a12788558

router.post('/signupAssociation', signupAssociation)
router.post('/loginassociation', loginassociation)
router.put('/UpdateAssociation/:id', UpdateAssociation)
router.post('/deactivateAccount/:id', deactivateAccount)
router.post('/activateAccount/:id', activateAccount)

  //get list association
  router.get('/getAll',getListAssociation)
  router.get('/get/:id',getAssociation)

  router.get('/verifier/:id',verifiedAsso)

module.exports = router;
