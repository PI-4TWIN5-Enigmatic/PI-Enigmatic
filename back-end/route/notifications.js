const express = require('express')
const { addNotifications, getAllNotifications, getNotificationDetails, deleteNotification, deleteNotificationwith } = require('../controllers/notifications')
const router = express.Router()


router.post('/addNotifications/:id', addNotifications)
router.get('/getAllnotifications/:id', getAllNotifications)
router.get('/detailNotification/:id', getNotificationDetails)
router.delete('/deleteNotification/:id', deleteNotification)
router.delete('/deleteNotificationwith/:id', deleteNotificationwith)



module.exports = router;