const express = require('express')
const router = express.Router()
const {createEvent , getAssociationEvents , getEventById ,getAllEvent , updateEvent , deleteEvent} = require("../controllers/event")


router.post('/:id/createEvent', createEvent)
router.get("/:organisateurEvent/events" , getAssociationEvents);
router.get("/getEventById/:id" , getEventById);
router.get("/getAllEvent" , getAllEvent);
router.put("/updateEvent/:id" , updateEvent);
router.delete('/deleteEvent/:id',deleteEvent);

module.exports = router;