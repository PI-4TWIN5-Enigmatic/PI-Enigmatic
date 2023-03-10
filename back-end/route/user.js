const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const {signup,getListUser,forgetPassword,emailSend,changerPass} = require("../controllers/user")
=======
const {signup,getListUser,login} = require("../controllers/user")
>>>>>>> 9dd69cabeb90cefe46b6d9d789f77a7479a92ea9


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

router.post('/login', login)

module.exports = router;
