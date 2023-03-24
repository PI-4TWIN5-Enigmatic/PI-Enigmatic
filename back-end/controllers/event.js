const event = require("../models/event")
const Association = require("../models/association")
const Event = require("../models/event")

exports.createEvent =async (req, res ) =>{

    const{id}=req.params;
    const association = await Association.findById(id);
    const event = await Event.create({...req.body,organisateurEvent:association})

    res.status(201).json({
        sucess: true,
        event
        
    })
}