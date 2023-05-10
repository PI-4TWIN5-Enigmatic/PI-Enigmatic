const express = require('express')
const router = express.Router()
const {createPost,getpostbyid,getassociationpost,get,all,reportPost,createSurvey,likeComment,markPostAsSaved,saved,markPostAsunsaved,incrementVote,dislikeComment,allassociation,
 gettimeline,   readPost,updatePost,getallposts,deletePost,likePost,unlikePost,commentPost,editCommentPost,deleteCommentPost} = require("../controllers/post");
const { verifyToken } = require('../middleware/auth');

router.get('/getpost', readPost);
router.get('/get/:id', get);


//getpostsuser
router.get('/getposts/:id', getallposts);
//association
router.get('/getpostsassociation/:id', getassociationpost);


router.get('/get/:id', getallposts);
router.get('/all/:id', all);
router.get('/saved/:id', saved);



router.post('/posts/report/:id', reportPost);

router.post('/posts/survey/:id', createSurvey);






// router.get('/timeline/all', gettimeline);

router.get("/profile/:id",getallposts)

router.post('/',createPost);
router.put('/updatepost/:id',updatePost);
router.delete('/:id',deletePost);
//likes
router.put('/like-post/:id',likePost);
router.put('/unlike-post/:id', unlikePost);
router.put('/like-comment/:id',likeComment);

router.put('/dislike-comment/:id',dislikeComment);

//comments

router.put('/comment-post/:id', commentPost);
router.put('/edit-comment-post/:id', editCommentPost);
router.put('/delete-comment-post/:id', deleteCommentPost);
router.put('/save-post/:id', markPostAsSaved);

router.put('/unsave-post/:id', markPostAsunsaved);




// router.put('updatePost/:id',updatePost)
// router.delete('deletePost/:id',deletePost)



router.put('/vote/:postId', incrementVote);











module.exports = router;