const express = require('express')
const router = express.Router()
const {readPost,CreatePost} = require("../controllers/post")


router.get('/readpost',readPost)
router.post('/CreatePost',CreatePost)
// router.put('updatePost/:id',updatePost)
// router.delete('deletePost/:id',deletePost)














module.exports = router;