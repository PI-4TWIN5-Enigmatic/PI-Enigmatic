const express = require('express')
const router = express.Router()
const {signup,UpdateUser,activateAccount,getListUser,forgetPassword,emailSend,changerPass ,tokendata, getUser, loginuser,banUser,unbanUser, uploads, deactivateAccount,confirmationemail, getUsersByIds, followUser, unfollowUser, getFollowedProfiles, getFollowingProfiles} = require("../controllers/user")
const{verifyToken}=require ("../middleware/auth")
const {admin}=require ("../middleware/isadmin")
const {uploadProfil} =require("../controllers/upload")
const multer = require("multer");
const upload = multer();


router.get('/', function (req, res) {
    res.send('Hello World')
  })

  //get list users
router.get('/users/getAll',getListUser)

  //GET_USER_BY_ID
router.get('/getuser/:id' ,getUser);
router.post('/getUsersById' ,getUsersByIds);


//Envoyer mail avec OPT
router.post("/password",emailSend);


  //forget password
router.post('/forgetPassword',changerPass)

// confirmationemail
router.post('/confirmationemail',confirmationemail)

router.post('/upload', upload.single('file'),uploadProfil);



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
router.post('/users/:userId/follow', followUser);

// Unfollow a user
router.post('/users/:userId/unfollow',unfollowUser);

router.get("/:userId/followedProfiles", getFollowedProfiles);
router.get("/:userId/followingProfiles", getFollowingProfiles);




module.exports = router;