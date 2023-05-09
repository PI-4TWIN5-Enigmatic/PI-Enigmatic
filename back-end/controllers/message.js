const Message = require("../models/message")

exports.createMessage =async (req, res ) =>{

 const newMessage = new Message(req.body)
 try{
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
 }catch(err){
    res.status(500).json(err)
 }
}

exports.fetchMessage = async (req,res) =>{


    try{
       const messages = await Message.find({
        conversationId: req.params.conversationId,
       })
       res.status(200).json(messages)
     }catch(err){
        res.status(500).json(err)
     }
}

exports.fetchLastMessage = async (req, res) => {
   try {
     const lastMessage = await Message.findOne({
       conversationId: req.params.conversationId,
     })
       .sort({ createdAt: -1 })
       .limit(1);
     res.status(200).json(lastMessage);
   } catch (err) {
     res.status(500).json(err);
   }
 };