import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/roles.middleware.js';
import { deleteUser, createAdmin, revokeAdmin } from '../controllers/admin.controller.js';

const router = express.Router();
// only admin or owner
router.delete('/user/:id', auth, requireRole('admin', 'owner'), deleteUser);
router.post('/admin', auth, requireRole('owner'), createAdmin);
router.post('/admin/:id/revoke', auth, requireRole('owner'), revokeAdmin);
export default router;
