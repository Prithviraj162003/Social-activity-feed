import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { getProfile, followUser, blockUser } from '../controllers/users.controller.js';

const router = express.Router();
router.get('/:id', auth, getProfile);
router.post('/:id/follow', auth, followUser);
router.post('/:id/block', auth, blockUser);
export default router;
