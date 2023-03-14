const express = require('express')
const router = express.Router()
const {signup,getListUser,forgetPassword,emailSend,changerPass , login,banUser,unbanUser} = require("../controllers/user")
const{verifyToken}=require ("../middleware/auth")
const {admin}=require ("../middleware/isadmin")

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
router.put('/banuser',verifyToken,admin,banUser)

router.put('/unbanuser',verifyToken,admin,unbanUser)


module.exports = router;
