const express = require('express')
const { addNotifications, getAllNotifications } = require('../controllers/notifications')
const router = express.Router()


router.post('/addNotifications/:id', addNotifications)
router.get('/getAllnotifications', getAllNotifications)


module.exports = router;