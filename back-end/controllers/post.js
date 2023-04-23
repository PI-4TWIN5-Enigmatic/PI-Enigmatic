const postModel = require('../models/post.model')
const UserModel = require('../models/user')
const ObjectID = require("mongoose").Types.ObjectId;
const PostModel = require('../models/post.model')
const Association = require('../models/association')



module.exports.all = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const following = [...user.followingProfil, id]; // add user ID to following array
    const posts = await PostModel.find({ posterId: { $in: following } }).populate({path:"comments.commenterid",select :"firstName lastName profilePicture"}).populate({path:"posterId",select :"firstName lastName profilePicture"})
    .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
}





module.exports.readPost = (req, res) => {
  postModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).populate({path:"posterId",select :"firstName lastName profilePicture"}).sort({ createdAt: -1 });
};


//   //get timeline posts

//   module.exports.gettimeline = async (req, res) => {
//     try {
//     const currentUser = await UserModel.findById(req.body.posterId);
//     const userPosts = await postModel.find({ posterId: currentUser._id });
//     const friendPosts = await Promise.all(
//       currentUser.followingProfil.map((followingProfil) => {
//         return Post.find({ userId: followingProfil });
//       })
//     );
//     res.json(userPosts.concat(...friendPosts))
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

module.exports.createPost = async (req, res) => {

  const newPost = new postModel({
    posterId: req.body.posterId,
    posterpseudo: req.body.posterpseudo,
    posterlastname:req.body.posterlastname,
    posterphoto: req.body.posterphoto,
    message: req.body.message,
    img: req.body.img,
    video:req.body.video,
    location:req.body.location,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};



// exports.updatePost = async (req, res) => {
//   try {

//       const data = await PostModel.findOneAndUpdate(
//         { _id: req.params.id },
//         req.body,
//         { new: true }
//       );
//       res.status(201).json(data);

//   } catch (error) {
//     console.log(error.message);
//   }
// };


module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};


// module.exports.likePost = async (req, res) => {

//   try {
//     const post = await PostModel.findById(req.params.id);
//     if (!post.likers.includes(req.body.posterId)) {
//       await PostModel.updateOne({ $push: { likers: req.body.posterId } });
//       res.status(200).json("The post has been liked");
//     } else {
//       await PostModel.updateOne({ $pull: { likers: req.body.posterId } });
//       res.status(200).json("The post has been disliked");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }

// };

//   module.exports.likePost= (req, res) => {
//     PostModel.findByIdAndUpdate(req.body.postId, {
//         $push: { likers: req.body.posterId }
//     }, {
//         new: true
//     }).exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })
// }



// module.exports.unlikePost= (req, res) => {
//   PostModel.findByIdAndUpdate(req.body.postId, {
//       $pull: { likers: req.user._id }
//   }, {
//       new: true
//   }).exec((err, result) => {
//           if (err) {
//               return res.status(422).json({ error: err })
//           } else {
//               res.json(result)
//           }
//       })
// }










//likes 
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//comments
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            text: req.body.text,
            commenterid: req.body.commenterid
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    )
  } catch (err) {
    return res.status(400).send(err);
  }
};


// module.exports.commentPost = (req, res) => {
//   const comment = {
//     comment: req.body.text,
//     posterId: req.body.posterId
//   }

//   PostModel.findByIdAndUpdate(   req.body.postId,  {

//     $push: { comments:comment }
//   }, { new: true },
//   (err, docs) => {
//     if (!err) res.send(docs);
//     else return res.status(400).send(err);
//   }
// );

// }












module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
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


module.exports.getallposts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const posts = await PostModel.find({ posterId: user._id }).populate({path:"comments.commenterid",select :"firstName lastName profilePicture"}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }

}


module.exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const posts = await PostModel.find({ posterId: user._id }).populate({path:"comments.commenterid",select :"firstName lastName profilePicture"})
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }

}



//association user's all posts

module.exports.getassociationpost = async (req, res) => {
  try {
    const { id } = req.params;
    const association = await Association.findById(id);
    const posts = await PostModel.find({ posterId: association._id }).populate({path:"comments.commenterid",select :" firstName lastName profilePicture"})
    .sort({ createdAt: -1 });;
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }

}