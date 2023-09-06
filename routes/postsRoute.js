const postsController = require('../controllers/postsController');

const express = require('express');

const router = express.Router();

router.post('/add-post', postsController.addPost);

router.get('/get-posts', postsController.getPosts);

router.get('/get-post-by-id/:id', postsController.getPostById);

router.post('/add-post-comment', postsController.addPostComment);

router.get('/get-post-comment', postsController.getPostComment);

router.put('/like-post', postsController.likePost);

router.put('/dislike-post', postsController.dislikePost);

router.delete('/delete-post', postsController.deletePost);

module.exports = router;