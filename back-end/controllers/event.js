const Event = require("../models/event")
const User = require("../models/user")
const nodemailer =require("nodemailer")


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
        
        const events = await Event.findById(id).populate({
          path: "reviews.reviewerId",
          select: "firstName lastName profilePicture",
        });

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
    

  


        module.exports.reviewEvent = (req, res) => {
            try {
              return Event.findByIdAndUpdate(
                req.params.id,
                {
                  $push: {
                    reviews: {
                        reviewerId: req.body.reviewerId,
                        review: req.body.review,
                        rating:req.body.rating,
                      timestamp: new Date().getTime(),
                    },
                  },
                },
                { new: true },
                (err, docs) => {
                  if (!err) return res.send(docs);
                  else return res.status(400).send(err);
                }
              );
            } catch (err) {
              return res.status(400).send(err);
            }
          };


          module.exports.deleteReviewEvent = (req, res) => {
          
            try {
              return Event.findByIdAndUpdate(
                req.params.id,
                {
                  $pull: {
                    reviews: {
                      _id: req.body.reviewerId,
                    },
                  },
                },
                { new: true },
                (err, docs) => {
                  if (!err) return res.send(docs);
                  else return res.status(400).send(err);
                }
              );
            } catch (err) {
              return res.status(400).send(err);
            }
          };


        
  exports.attendeesList =async (req, res) => {
    try{
        const{id}=req.params;
        const{userId }=req.body;
        const event = await Event.findById(id);

        event.attendeesList.set(userId,true);
        

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {attendeesList:event.attendeesList},
            {new:true}
        )

        res.status(200).json(updatedEvent);

    }catch(err){
            res.status(404).json({error:err.message});
    }
    }

    exports.unconfirm =async (req, res) => {
      try{
          const{id}=req.params;
          const{userId }=req.body;
          const event = await Event.findById(id);
          const isHere =  event.attendeesList.get(userId)
          if(isHere){
            event.attendeesList.delete(userId,true);
          }
          
  
          const updatedEvent = await Event.findByIdAndUpdate(
              id,
              {attendeesList:event.attendeesList},
              {new:true}
          )
  
          res.status(200).json(updatedEvent);
  
      }catch(err){
              res.status(404).json({error:err.message});
      }
      }
    
  
      exports.getRating = async (req, res) => {
        try {
          let s = 0;
          const { id } = req.params;
          const event = await Event.findById(id);
          const reviews = event.reviews;
      
          for (const review of reviews) {
            s += review.rating;
          }
      
          const average = s / reviews.length;
          res.status(200).json( average );
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }


      exports.getUserScore=async (req, res) => {
        try {
          let s = 0;
          const { idUser } = req.params;
          const events = await Event.find();
          for (const e of events) {
            const isAttendee = e.attendeesList.get(idUser);
            if (isAttendee){
            s += 1 ;
               }
            }
          const score = s 
          res.status(200).json( score );
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    
      

      exports.sendMailEvent=async(req,res)=>{
          const {userMail}=req.body
          const {associationMail}=req.body;
          const {eventName}=req.body;
          const {assoName}=req.body;
          const {userName}=req.body;
          const {eventLocation}=req.body;
          const {myAssoName}=req.body;
          const {eventDate}=req.body;
          const {assoId}=req.body;
          const {eventId}=req.body;
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'farah.jerbi@esprit.tn',
              pass: 'zkchblmedarliazf'
            }
          });
        
        try{
        
            const mailOptions={
              from: `${userMail}`,
              to: `${associationMail}`,
              subject: `Partnership Inquiry for ${eventName} `,
              html: `
              <body style="font-family: Arial, sans-serif; font-size: 16px; color: #555;">
              <p style="font-weight: bold;"><u>Dear ${assoName} association,</u></p>
              <p style="text-align: justify;">I hope this email finds you well. 
              <p style="text-align: justify;"> My name is <strong><span style="color: red;">${userName}</span></strong> and I am reaching out on behalf of <strong><span style="color: red;">${myAssoName}</span></strong>. We are excited to announce our upcoming event, <strong><span style="color: red;">${eventName}</span></strong>, which will take place on <strong><span style="color: red;">${eventDate}</span></strong> at <strong><span style="color: red;">${eventLocation}</span></strong>.</p>
              <p style="text-align: justify;">As we plan for this event, we believe that a partnership with <strong><span style="color: red;">${assoName}</span></strong> would be a valuable opportunity for both of our organizations.Our respective goals, values, and mission statements align well, and we believe that working together will help us achieve even greater success in our shared endeavors. .</p>
              <p style="text-align: justify;">We would be honored to have <strong><span style="color: red;">${assoName}</span></strong> as a partner for <strong><span style="color: red;">${eventName}</span></strong></p>
              <p style="text-align: justify;">If you are interested in exploring this partnership further, please let us know. We would be happy to discuss the details of the partnership and answer any questions you may have. We are also open to suggestions on how we can best collaborate to make this event a success.</p>
              <p></p>
              <p style="text-align: center;"><strong><span style="color: red;">Thank you for your time and consideration.</span></strong></p>
              <p style="text-align: center;"><button style="background-color: red; padding: 10px 20px; border: none; border-radius: 5px;"><a href="http://localhost:3000/partnershipConfirmed?assoId=${assoId}&eventId=${eventId}" style="color: white; text-decoration: none; font-weight: bold;">Confirm Partnership</a></button></p>
              <p style="text-align: justify;"><strong>Best regards,</strong></p>
              <p style="text-align: justify;"><strong><span style="color: red;">${userName}</span></strong></p>
              <p style="text-align: justify;"><strong><span style="color: red;">${myAssoName}</span></strong></p>
            </body>
          `
          }
          return transporter.sendMail(mailOptions);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }

      }



      



      exports.confirmPartner= async (req, res) => {
        try {
          console.log(req.query);
          const { assoId, eventId } = req.query;
      
          const event = await Event.findById(eventId);
      
          event.partnersList.set(assoId, true);
      
          const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { partnersList: event.partnersList },
            { new: true }
          );
      
          res.status(200).json(updatedEvent);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };


      
    exports.favoriteEvents =async (req, res) => {
      try{
          const{eventId,userId }=req.body;
          const user = await User.findById(userId);
          const isFavorite = user.favEvents.get(eventId);
      
          if (isFavorite){
              user.favEvents.delete(eventId);
          }else{
            user.favEvents.set(eventId,true);
          }
  
          const updatedUser = await User.findByIdAndUpdate(
            userId,
              {favEvents:user.favEvents},
              {new:true}
          )
  
          res.status(200).json(updatedUser);
  
      }catch(err){
              res.status(404).json({error:err.message});
      }
      }


      exports.getEventsByIds = async (req, res) => {
        try {
          const { ids } = req.body;
          const events = [];
      
          for (const id of ids) {
            const e = await Event.findById(id);
      
            if (e === null) {
              console.log(`events ${id} not found in database`);
              continue;
            }
      
            events.push(e);
          }
      
          res.status(200).json(events);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    
      