import User from '../models/User.js';
import { recordActivity } from '../utils/activity.util.js';

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password').populate('followers', 'name').populate('following', 'name');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const followUser = async (req, res) => {
  const { id } = req.params; // id to follow
  const actor = req.user;
  try {
    if (actor._id.equals(id)) return res.status(400).json({ message: 'Cannot follow yourself' });
    const target = await User.findById(id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (target.followers.includes(actor._id)) return res.status(400).json({ message: 'Already following' });
    target.followers.push(actor._id);
    actor.following.push(target._id);
    await target.save();
    await actor.save();
    await recordActivity({ type: 'follow', actor: actor._id, targetUser: target._id, message: `${actor.name} followed ${target.name}` });
    res.json({ message: 'Followed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const blockUser = async (req, res) => {
  const { id } = req.params; // id to block
  const actor = req.user;
  try {
    const target = await User.findById(id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (actor.blocked.includes(target._id)) return res.status(400).json({ message: 'Already blocked' });
    // Add to blocked list of actor
    actor.blocked.push(target._id);
    // If actor was following target, remove
    actor.following = actor.following.filter(f => !f.equals(target._id));
    // If target was following actor, remove
    target.followers = target.followers.filter(f => !f.equals(actor._id));
    await actor.save();
    await target.save();
    await recordActivity({ type: 'block', actor: actor._id, targetUser: target._id, message: `${actor.name} blocked ${target.name}` });
    res.json({ message: 'Blocked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
