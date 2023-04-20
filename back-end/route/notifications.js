const express = require('express')
const { addNotifications, getAllNotifications, getNotificationDetails, deleteNotification } = require('../controllers/notifications')
const router = express.Router()


router.post('/addNotifications/:id', addNotifications)
router.get('/getAllnotifications', getAllNotifications)
router.get('/detailNotification/:id', getNotificationDetails)
router.delete('/deleteNotification/:id', deleteNotification)



module.exports = router;