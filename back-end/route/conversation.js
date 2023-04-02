const express = require('express')
const router = express.Router()
const {createConversation,getConversation} = require("../controllers/conversation")

router.post("/",createConversation)
router.get("/:userId",getConversation)

module.exports = router;