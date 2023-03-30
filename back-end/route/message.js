const express = require('express')
const router = express.Router()
const {createMessage,fetchMessage} = require("../controllers/message")

router.post("/",createMessage)
router.get("/:conversationId",fetchMessage)



module.exports = router;