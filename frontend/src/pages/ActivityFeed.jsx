import React, { useEffect, useState } from 'react';
import * as activityService from '../services/activityService.js';
import ActivityCard from '../components/ActivityCard.jsx';

export default function ActivityFeed(){
  const [activities, setActivities] = useState([]);
  useEffect(()=> {
    (async ()=> {
      try {
        const res = await activityService.getActivities();
        setActivities(res.data);
      } catch (err) { console.error(err); }
    })();
  }, []);
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Activity Wall</h2>
      <div>
        {activities.length === 0 ? <div className="text-gray-500">No activities</div> : activities.map(a => <ActivityCard key={a._id} activity={a} />)}
      </div>
    </div>
  );
}
