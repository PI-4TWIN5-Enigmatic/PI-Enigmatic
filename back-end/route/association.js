const express = require('express')
const router = express.Router()
const {signupAssociation , getListAssociation} = require("../controllers/association")



router.post('/signupAssociation', signupAssociation)

  //get list association
  router.get('/getAll',getListAssociation)

module.exports = router;
