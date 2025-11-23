import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { recordActivity } from '../utils/activity.util.js';

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User exists' });
    user = await User.create({ name, email, password });
    // If this is the first user, make them owner (optional convenience)
    const count = await User.countDocuments();
    if (count === 1) {
      user.role = 'owner';
      await user.save();
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    await recordActivity({ type: 'joined', actor: user._id, message: `${user.name} joined the network` });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
