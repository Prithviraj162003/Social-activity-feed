import Post from '../models/Post.js';
import User from '../models/User.js';
import { recordActivity } from '../utils/activity.util.js';

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content required' });
    }

    const post = await Post.create({ author: req.user._id, content });

    await recordActivity({
      type: 'post',
      actor: req.user._id,
      targetPost: post._id,
      message: `${req.user.name} made a post`,
    });

    res.json(post);
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Like or Unlike a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // post id
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user._id.toString();

    if (!post.likes.includes(userId)) {
      post.likes.push(userId); // Like
      await recordActivity({
        type: 'like',
        actor: req.user._id,
        targetPost: post._id,
        message: `${req.user.name} liked a post`,
      });
    } else {
      post.likes.pull(userId); // Unlike
    }

    await post.save();

    res.json({ message: 'Like status updated', likes: post.likes.length });
  } catch (err) {
    console.error('Like Post Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name role');

    if (!req.user) {
      return res.json(posts.sort((a, b) => b.createdAt - a.createdAt));
    }

    const filtered = posts.filter(p => {
      if (req.user.blocked && req.user.blocked.find(b => b.equals(p.author._id))) {
        return false;
      }
      return true;
    });

    res.json(filtered.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    console.error('Get Posts Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Permission check
    if (
      post.author.toString() !== req.user._id.toString() &&
      !['admin', 'owner'].includes(req.user.role)
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Post.findByIdAndDelete(id); // Correct way to delete

    await recordActivity({
      type: 'post_deleted',
      actor: req.user._id,
      targetPost: id,
      message: `Post deleted by ${req.user.name}`,
    });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete Post Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
