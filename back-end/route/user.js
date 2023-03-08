const express = require('express')
const router = express.Router()
const {signup,getListUser,login} = require("../controllers/user")


router.get('/', function (req, res) {
    res.send('Hello World')
  })

  //get list users
router.get('/users/getAll',getListUser)



router.post('/signup', signup)

router.post('/login', login)

module.exports = router;
