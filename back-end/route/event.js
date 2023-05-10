const express = require('express')
const router = express.Router()
const {createEvent , getAssociationEvents , getEventById ,getAllEvent , updateEvent , 
    deleteEvent ,participateEvent,interestedInEvent, reviewEvent, deleteReviewEvent, 
    attendeesList,unconfirm, getRating, getUserScore, sendMailEvent,confirmPartner, favoriteEvents, getEventsByIds, participation, intresting, founder} = require("../controllers/event")
const{verifyToken}=require ("../middleware/auth")


router.post('/:id/createEvent',verifyToken, createEvent)
router.get("/:organisateurEvent/events" ,verifyToken, getAssociationEvents);
router.get("/getEventById/:id" , getEventById);
router.get("/getAllEvent" , getAllEvent);
router.put("/updateEvent/:id" ,verifyToken, updateEvent);
router.delete('/deleteEvent/:id',verifyToken,deleteEvent);
router.patch('/participateEvent/:id',verifyToken, participateEvent);
router.patch('/interestedInEvent/:id',verifyToken, interestedInEvent);
router.patch('/reviewEvent/:id',verifyToken, reviewEvent);
router.patch('/deleteReview/:id',verifyToken, deleteReviewEvent);
router.patch('/attendeesList/:id',attendeesList);
router.patch('/unconfirm/:id',unconfirm);
router.get("/getRating/:id", getRating);
router.get("/getUserScore/:id", getUserScore);
router.post("/sendMailEvent", sendMailEvent);
router.post("/confirmPartner", confirmPartner);
router.patch("/favEvent", favoriteEvents);
router.post('/getEventsByIds' ,getEventsByIds);
router.post('/getParticipation' ,participation);
router.post('/getInteresting' , intresting);
router.post('/getFounder' , founder);



module.exports = router;