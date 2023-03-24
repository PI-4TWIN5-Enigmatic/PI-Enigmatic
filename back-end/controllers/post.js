const PostModel=require('../models/posts')
const UserModel=require('../models/user')
const ObjectId=require('mongoose').Types.ObjectId



module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
  };
  
  module.exports.CreatePost = async (req, res) => {
    const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video:req.body.video,
    likers:[],
    comments:[],
    

})  ;
try{
    const post=await newPost.save()
    return res.status(201).json(post);
}
catch(err){
    return res.status(400).send(err);
}
  
}