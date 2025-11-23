import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/users.routes.js';
import postRoutes from './src/routes/posts.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import Activity from './src/models/Activity.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);

// activity endpoint
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('actor', 'name')
      .populate('targetUser', 'name')
      .populate('targetPost', 'content')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => res.send('Social activity feed API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
