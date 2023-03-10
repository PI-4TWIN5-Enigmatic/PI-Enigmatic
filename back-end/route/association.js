const express = require('express')
const router = express.Router()
const {signupAssociation , getListAssociation, verifiedAsso, } = require("../controllers/association")



router.post('/signupAssociation', signupAssociation)

  //get list association
  router.get('/getAll',getListAssociation)

  router.get('/verifier/:id',verifiedAsso)

module.exports = router;
