const express = require('express')
const router = express.Router()
const {signup,getListUser,forgetPassword,emailSend,changerPass} = require("../controllers/user")


router.get('/', function (req, res) {
    res.send('Hello World')
  })

  //get list users
router.get('/users/getAll',getListUser)

//Envoyer mail avec OPT
router.post("/password",emailSend);

  //forget password
router.post('/forgetPassword',changerPass)



router.post('/signup', signup)

module.exports = router;
