const Conversation = require("../models/conversation")


exports.createConversation = async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    try {
        // Check if conversation already exists
        const conversationExists = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (conversationExists) {
   
            return res.send("Conversation already exists ! please check your messages ! ")
        }

        // Create new conversation
        const newConversation = new Conversation({
            members: [senderId, receiverId],
        });
        const savedConversation = await newConversation.save();
        return res.send("A conversation had been created please check your Messages")
    } catch (err) {
        res.status(500).json(err);
    }
};


exports.getConversation = async (req, res) =>{
    try{

        const conversation = await Conversation.find({
            members : {$in:[req.params.userId]},
        });
        res.status(200).json(conversation)

    }catch(err){
        res.status(500).json(err)
    }

}


exports.getConversationOfTwoUsers = async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  }