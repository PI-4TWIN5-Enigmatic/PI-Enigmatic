const express = require('express')
const router = express.Router()
const {createPost,getpostbyid,getassociationpost,get,all,
 gettimeline,   readPost,updatePost,getallposts,deletePost,likePost,unlikePost,commentPost,editCommentPost,deleteCommentPost} = require("../controllers/post");
const { verifyToken } = require('../middleware/auth');

router.get('/getpost', readPost);
router.get('/get/:id', get);

router.get('/getpost/:id', readPost);

//getpostsuser
router.get('/getposts/:id', getallposts);
//association
router.get('/getpostsassociation/:id', getassociationpost);


router.get('/get/:id', getallposts);
router.get('/all/:id', all);










// router.get('/timeline/all', gettimeline);

router.get("/profile/:id",getallposts)

router.post('/',createPost);
router.put('/updatepost/:id',updatePost);
router.delete('/:id',deletePost);
//likes
router.put('/like-post/:id',likePost);
router.put('/unlike-post/:id', unlikePost);

//comments

router.put('/comment-post/:id', commentPost);
router.patch('/edit-comment-post/:id', editCommentPost);
router.patch('/delete-comment-post/:id', deleteCommentPost);




// router.put('updatePost/:id',updatePost)
// router.delete('deletePost/:id',deletePost)














module.exports = router;