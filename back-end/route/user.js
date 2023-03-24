const express = require('express')
const router = express.Router()
const {signup,UpdateUser,activateAccount,getListUser,forgetPassword,emailSend,changerPass ,tokendata, getUser, loginuser,banUser,unbanUser, uploads, deactivateAccount,confirmationemail} = require("../controllers/user")
const{verifyToken}=require ("../middleware/auth")
const {admin}=require ("../middleware/isadmin")

router.get('/', function (req, res) {
    res.send('Hello World')
  })

  //get list users
router.get('/users/getAll',getListUser)

  //GET_USER_BY_ID
router.get('/getuser/:id' ,getUser);


//Envoyer mail avec OPT
router.post("/password",emailSend);


  //forget password
router.post('/forgetPassword',changerPass)

// confirmationemail
router.post('/confirmationemail',confirmationemail)




router.post('/signup', signup)


// Users Login Route
router.post("/login-user", loginuser)
router.get("/tokendata",verifyToken,tokendata)

router.put('/banuser',verifyToken,banUser)

router.put('/unbanuser',verifyToken,unbanUser)
  //update User
router.put('/updateUser/:id',verifyToken,UpdateUser)
//Envoyer mail avec OPT
router.post("/password",emailSend);
  //forget password
router.post('/forgetPassword',changerPass)
router.post('/signup', signup)
router.post('/uploads',uploads)
router.post('/deactivateAccount/:id', deactivateAccount)
router.post('/activateAccount/:id', activateAccount)




module.exports = router;