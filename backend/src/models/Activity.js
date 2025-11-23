import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['post', 'follow', 'like', 'user_deleted', 'post_deleted', 'block', 'joined'],
    required: true
  },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Activity', ActivitySchema);
