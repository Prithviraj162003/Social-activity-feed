import Activity from '../models/Activity.js';

export async function recordActivity({ type, actor, targetUser = null, targetPost = null, message = '' }) {
  try {
    const act = await Activity.create({ type, actor, targetUser, targetPost, message });
    return act;
  } catch (err) {
    console.error('Activity record failed:', err);
    return null;
  }
}
