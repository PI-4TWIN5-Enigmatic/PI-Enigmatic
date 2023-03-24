const express = require('express')
const router = express.Router()
const {createPost,readPost,updatePost,deletePost,likePost,unlikePost,commentPost,editCommentPost,deleteCommentPost} = require("../controllers/post")

router.get('/getpost', readPost);

router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
//likes
router.patch('/like-post/:id', likePost);
router.patch('/unlike-post/:id', unlikePost);

//comments

router.patch('/comment-post/:id', commentPost);
router.patch('/edit-comment-post/:id', editCommentPost);
router.patch('/delete-comment-post/:id', deleteCommentPost);



// router.put('updatePost/:id',updatePost)
// router.delete('deletePost/:id',deletePost)














module.exports = router;