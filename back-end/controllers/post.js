const postModel = require('../models/post.model')
const UserModel = require('../models/user')
const ObjectID = require("mongoose").Types.ObjectId;
const PostModel = require('../models/post.model')
const Association = require('../models/association')



// module.exports.all = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserModel.findById(id);
//     const following = [...user.followingProfil, id]; // add user ID to following array
//     const posts = await PostModel.find({ posterId: { $in: following } }).populate({path:"comments.commenterid",select :"firstName lastName profilePicture"}).populate({path:"posterId",select :"firstName lastName profilePicture"})
//     .sort({ createdAt: -1 });
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }

//report a post
module.exports.all = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const following = [...user.followingProfil, id]; // add user ID to following array
    const posts = await PostModel.find({
      posterId: { $in: following },
      reports: { $not: { $elemMatch: { reportedBy: id } } },
    })
      .populate({
        path: "comments.commenterid",
        select: "firstName lastName profilePicture occupation",
      })
      .populate({
        path: "likers.likerid",
        select: "firstName lastName profilePicture",
      })
      .populate({
        path: "comments.likerscomment.commentlikerid",
        select: "firstName lastName profilePicture",
      })
      .populate({ path: "posterId", select: "firstName lastName profilePicture" })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.saved = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const following = [...user.followingProfil, id]; // add user ID to following array
    const posts = await PostModel.find({
      posterId: { $in: following },
      reports: { $not: { $elemMatch: { reportedBy: id } } },
      saved: true,
    })
      .populate({
        path: "comments.commenterid",
        select: "firstName lastName profilePicture occupation",
      })
      .populate({
        path: "likers.likerid",
        select: "firstName lastName profilePicture",
      })
      .populate({
        path: "comments.likerscomment.commentlikerid",
        select: "firstName lastName profilePicture",
      })
      .populate({ path: "posterId", select: "firstName lastName profilePicture" })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports.reportPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason ,reportedBy} = req.body;
    const post = await PostModel.findById(id);
  
    // create a report object with the reason and the user who reported the post
    const report = {
      reason,
      reportedBy,
    };
    // add the report to the post's reports array using $addToSet
    await PostModel.findByIdAndUpdate(id, { $addToSet: { reports: report } });
    res.status(200).json({ message: 'Post reported successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
}



module.exports.readPost = (req, res) => {
  postModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).populate({path:"posterId",select :"firstName lastName profilePicture"}).populate({
    path: "likers.likerid",
    select: "firstName lastName profilePicture",
  }).sort({ createdAt: -1 });
};


// module.exports.all = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserModel.findById(id);
//     const following = [
//       ...user.followingProfil,
//       ...user.followingAssociation.map(a => a._id), 
//       id
//     ];
//     const posts = await PostModel.find({
//       $or: [
//         { posterId: { $in: following } },
//         { posterIdassociation: { $in: following } } 
//       ],
//       reports: { $not: { $elemMatch: { reportedBy: id } } },
//     })
//       .populate({
//         path: "comments.commenterid",
//         select: "firstName lastName profilePicture occupation",
//       })
//       .populate({
//         path: "likers.likerid",
//         select: "firstName lastName profilePicture",
//       })
//       .populate({
//         path: "comments.likerscomment.commentlikerid",
//         select: "firstName lastName profilePicture",
//       })
//       .populate({ path: "posterId", select: "firstName lastName profilePicture" })
//       .populate({ path: "posterIdassociation", select: "name logoPicture" }) 
//       .sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };


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
    saved: false ,
    likers: [],
    comments: [],
    surveyQuestions:req.body.surveyQuestions });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.incrementVote = async (req, res) => {
  const postId = req.params.postId;
  const questionId = req.body.questionId;
  const optionId = req.body.optionId;
  const userId = req.body.userId;


  if (!ObjectID.isValid(postId) || !ObjectID.isValid(questionId) || !ObjectID.isValid(optionId)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId, "surveyQuestions._id": questionId, "surveyQuestions.options._id": optionId },
      {
        $inc: { "surveyQuestions.$[question].options.$[option].votes": 1 },
        $addToSet: { "surveyQuestions.$[question].options.$[option].voters": userId },

      },
      {
        new: true,
        arrayFilters: [{ "question._id": questionId }, { "option._id": optionId }],
      }
    );

    if (!updatedPost) {
      throw new Error("Post not found");
    }

    
    return res.json(updatedPost);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};






module.exports.markPostAsSaved = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postModel.findByIdAndUpdate(
      postId,
      { saved: true },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.markPostAsunsaved = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postModel.findByIdAndUpdate(
      postId,
      { saved: false },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};



// module.exports.createPost = async (req, res) => {
//   try {
//   const { posterId, posterpseudo, posterlastname, posterphoto, message, img, video, location, questions } = req.body;
// // Generate an array of survey questions based on the request body
// const surveyQuestions = questions.map((question, index) => ({
//   id: index + 1,
//   text: question.text,
//   type: question.type,
//   options: question.options ? question.options.map((option, index) => ({
//     id: index + 1,
//     text: option
//   })) : []
// }));

//  // Create a new post and add the survey questions to it
//  const post = new postModel({
//   posterId,
//   posterpseudo,
//   posterlastname,
//   posterphoto,
//   message,
//   img,
//   video,
//   location,
//   likers: [],
//   comments: [],
//   surveyQuestions,
// });
// await post.save();

// res.status(201).json(post);
// } catch (error) {
// console.error(error);
// res.status(500).send('Error creating post with survey');
// }
// }

// module.exports.createSurvey = async (req, res) => {
//   try {
//     const { questions } = req.body;

//     // Generate an array of survey questions based on the request body
//     const surveyQuestions = questions.map((question, index) => ({
//       id: index + 1,
//       text: question.text,
//       type: question.type,
//       options: question.options ? question.options.map((option, index) => ({
//         id: index + 1,
//         text: option
//       })) : []
//     }));

//     // Create a new post and add the survey questions to it
//     const post = new postModel({
//       surveyQuestions
//     });
//     await post.save();

//     res.status(201).send('Survey created successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error creating survey');
//   }
// };






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




//likes 
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
           $addToSet: {
          likers: {
           
            likerid: req.body.id
          },
        },
      },
      { new: true }
    )
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: {
          likes: {
           
            likesid: req.params.id
          },
        },      },
      { new: true }
    );

 
    res.status(200).json(post);
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
        $pull: {  likers: {
           
          likerid: req.body.likerid
        }, },
      },
      { new: true },
      
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    )

    await UserModel.findByIdAndUpdate(
      req.body.likerid,
      {
        $pull: { likes: {
           
          likesid: req.params.id
        },},
      },
      { new: true }
      ,
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

//surveyyycreate
module.exports.createSurvey = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!ObjectID.isValid(postId)) {
      return res.status(400).send("Invalid post ID: " + postId);
    }

    const question = req.body.question;
    const questionerId = req.body.questionerId;
    const options = [{
      text:  req.body.text,
    }]
    const surveyQuestion = { question, questionerId, options };

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $push: { surveyQuestions: surveyQuestion } },
      { new: true }
    );

    if (!post) {
      return res.status(404).send("Post not found");
    }

    return res.send(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
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
    const posts = await PostModel.find({ posterId: user._id }).populate({
      path: "likers.likerid",
      select: "firstName lastName profilePicture",
    }) .populate({
      path: "comments.likerscomment.commentlikerid",
      select: "firstName lastName profilePicture",
    }).populate({
      path: "comments.commenterid",
      select: "firstName lastName profilePicture occupation",
    }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }

}


module.exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const posts = await PostModel.find({ posterId: user._id }).populate({
      path: "likers.likerid",
      select: "firstName lastName profilePicture",
    }) .populate({
      path: "comments.commenterid",
      select: "firstName lastName profilePicture occupation",
    }).populate({
      path: "comments.likerscomment.commentlikerid",
      select: "firstName lastName profilePicture",
    })
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
    const posts = await PostModel.find({ posterId: association._id }).populate({
      path: "likers.likerid",
      select: "firstName lastName profilePicture",
    }) .populate({
      path: "comments.likerscomment.commentlikerid",
      select: "firstName lastName profilePicture",
    }).populate({path:"comments.commenterid",select :" firstName lastName profilePicture"})
    .sort({ createdAt: -1 });;
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }

}


module.exports.likeComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.body.commentId);

    if (commentIndex < 0) {
      return res.status(404).send("Comment not found");
    }
    await UserModel.findById(
      req.body.iduser,
     
     
    );

    post.comments[commentIndex].likerscomment.push({ commentlikerid: req.body.iduser });

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.dislikeComment = async (req, res) => {
 


    const post = await PostModel.findById(req.params.id);

    const commentId = req.body.commentId;

    await UserModel.findById(
      req.body.iduser,
     
     
    );
    await post.updateOne({
      $pull: {
        'comments.$[comment].likerscomment': { commentlikerid: req.body.iduser }
      }
    }, {
      arrayFilters: [{ 'comment._id': commentId }]
    });
    
    res.status(200).json(post);
    


  }
