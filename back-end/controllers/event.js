const event = require("../models/event")
const Association = require("../models/association")
const Event = require("../models/event")

exports.createEvent =async (req, res ) =>{

    const{id}=req.params;
    const event = await Event.create({...req.body,organisateurEvent:id})

    res.status(201).json({
        sucess: true, 
        event
        
    })
}




exports.getAssociationEvents =async (req, res ) =>{
    try{
        const{organisateurEvent}=req.params;
        
        const events = await Event.find({organisateurEvent});

        res.status(200).json(events);

    }catch(err){
            res.status(404).json({error:err.message});
    }
}


exports.getEventById =async (req, res ) =>{
    try{
        const{id}=req.params;
        
        const events = await Event.findById(id);

        res.status(200).json(events);

    }catch(err){
            res.status(404).json({error:err.message});
    }
}


exports.getAllEvent =async (req, res ) =>{
    try{
        
        const events = await Event.find();

        res.status(200).json(events);

    }catch(err){
            res.status(404).json({error:err.message});
    }
}


exports.updateEvent = async (req, res) => {
    try {
      
        const data = await Event.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        res.status(201).json(data);
      
    } catch (error) {
      console.log(error.message);
    }
  };


exports.deleteEvent = (req, res) => {
        
    Event.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
      });

}



  
  exports.participateEvent =async (req, res) => {
    try{
        const{id}=req.params;
        const{userId }=req.body;
        const event = await Event.findById(id);
        const isParticipate = event.participants.get(userId);
    
        if (isParticipate){
            event.participants.delete(userId);
        }else{
            event.participants.set(userId,true);
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {participants:event.participants},
            {new:true}
        )

        res.status(200).json(updatedEvent);

    }catch(err){
            res.status(404).json({error:err.message});
    }
    }
  


  
    exports.interestedInEvent =async (req, res) => {
      try{
          const{id}=req.params;
          const{userId }=req.body;
          const event = await Event.findById(id);
          const isInterested = event.interested.get(userId);
      
          if (isInterested){
              event.interested.delete(userId);
          }else{
              event.interested.set(userId,true);
          }
  
          const updatedEvent = await Event.findByIdAndUpdate(
              id,
              {interested:event.interested},
              {new:true}
          )
  
          res.status(200).json(updatedEvent);
  
      }catch(err){
              res.status(404).json({error:err.message});
      }
      }
    
  

  
