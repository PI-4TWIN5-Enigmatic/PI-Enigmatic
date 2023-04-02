const express = require('express')
const router = express.Router()
const {createConversation,getConversation, getConversationOfTwoUsers} = require("../controllers/conversation")

router.post("/",createConversation)
router.get("/:userId",getConversation)
router.get("/find/:firstUserId/:secondeUserId",getConversationOfTwoUsers)

module.exports = router;