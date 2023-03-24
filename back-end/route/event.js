const express = require('express')
const router = express.Router()
const {createEvent } = require("../controllers/event")


router.post('/:id/createEvent', createEvent)

module.exports = router;