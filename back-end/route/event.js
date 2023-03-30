const express = require('express')
const router = express.Router()
const {createEvent , getAssociationEvents , getEventById ,getAllEvent , updateEvent , deleteEvent ,participateEvent,interestedInEvent} = require("../controllers/event")


router.post('/:id/createEvent', createEvent)
router.get("/:organisateurEvent/events" , getAssociationEvents);
router.get("/getEventById/:id" , getEventById);
router.get("/getAllEvent" , getAllEvent);
router.put("/updateEvent/:id" , updateEvent);
router.delete('/deleteEvent/:id',deleteEvent);
router.patch('/participateEvent/:id', participateEvent);
router.patch('/interestedInEvent/:id', interestedInEvent);

module.exports = router;