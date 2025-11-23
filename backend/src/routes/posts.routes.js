import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { createPost, likePost, getAllPosts, deletePost } from '../controllers/posts.controller.js';

const router = express.Router();
router.post('/', auth, createPost);
router.post('/:id/like', auth, likePost);
router.get('/', auth, getAllPosts);
router.delete('/:id', auth, deletePost);
export default router;
