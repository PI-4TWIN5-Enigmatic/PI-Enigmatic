const express = require('express')
const router = express.Router()
const {signup} = require("../controllers/user")


router.get('/', function (req, res) {
    res.send('Hello World')
  })

router.post('/signup', signup)

module.exports = router;
