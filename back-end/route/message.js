const express = require('express')
const router = express.Router()
const {createMessage,fetchMessage, fetchLastMessage} = require("../controllers/message")

router.post("/",createMessage)
router.get("/:conversationId",fetchMessage)
router.get("/lastMessage/:conversationId",fetchLastMessage)



module.exports = router;