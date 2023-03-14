const express = require('express')
const router = express.Router()
const {signup,getListUser,forgetPassword,emailSend,changerPass , login,banUser,unbanUser, uploads} = require("../controllers/user")
const{verifyToken}=require ("../middleware/auth")


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
router.post('/uploads',uploads)

router.post('/login', login)
router.post('/banuser',verifyToken,banUser)

router.post('/unbanuser',verifyToken,unbanUser)


module.exports = router;
