import User from '../models/User.js';
import Post from '../models/Post.js';
import { recordActivity } from '../utils/activity.util.js';

// DELETE user (admin can delete users only; owner can delete anyone)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.user.role === 'admin' && user.role !== 'user') return res.status(403).json({ message: 'Admins can only delete users' });
    // Delete posts by the user
    await Post.deleteMany({ author: user._id });
    // Remove user from followers/following arrays of others
    await User.updateMany({}, { $pull: { followers: user._id, following: user._id, blocked: user._id } });
    await User.deleteOne({ _id: user._id });
    await recordActivity({ type: 'user_deleted', actor: req.user._id, targetUser: user._id, message: `${req.user.name} deleted user ${user.name}` });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// create admin (only owner)
export const createAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = 'admin';
    await user.save();
    res.json({ message: 'Admin created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// revoke admin (owner)
export const revokeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role !== 'admin') return res.status(400).json({ message: 'User is not admin' });
    user.role = 'user';
    await user.save();
    res.json({ message: 'Admin revoked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
