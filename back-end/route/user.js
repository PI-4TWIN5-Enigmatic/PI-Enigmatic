const express = require('express')
const router = express.Router()
const {signup,UpdateUser,activateAccount,getListUser,forgetPassword,emailSend,changerPass , getUser, login,banUser,unbanUser, uploads, deactivateAccount,confirmationemail} = require("../controllers/user")
const{verifyToken}=require ("../middleware/auth")
const {admin}=require ("../middleware/isadmin")

router.get('/', function (req, res) {
    res.send('Hello World')
  })

  //get list users
router.get('/users/getAll',getListUser)

  //GET_USER_BY_ID
router.get("/:id" , getUser);


//Envoyer mail avec OPT
router.post("/password",emailSend);


  //forget password
router.post('/forgetPassword',changerPass)

// confirmationemail
router.post('/confirmationemail',confirmationemail)




router.post('/signup', signup)

router.post('/login', login)
router.put('/banuser',verifyToken,admin,banUser)

router.put('/unbanuser',verifyToken,admin,unbanUser)
router.post('/unbanuser',verifyToken,unbanUser)
router.get('/users/getAll', getListUser)
  //update User
router.put('/updateUser/:id',UpdateUser)
//Envoyer mail avec OPT
router.post("/password",emailSend);
  //forget password
router.post('/forgetPassword',changerPass)
router.post('/signup', signup)
router.post('/uploads',uploads)
router.post('/login', login)
router.post('/banuser',verifyToken,banUser)
router.post('/unbanuser', verifyToken, unbanUser)
router.post('/deactivateAccount/:id', deactivateAccount)
router.post('/activateAccount/:id', activateAccount)




module.exports = router;