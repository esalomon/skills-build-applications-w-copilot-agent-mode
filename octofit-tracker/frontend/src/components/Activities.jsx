import { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data.results || data.items || data.data || [];
        setActivities(list);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error loading activities: {error}</div>;

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id || activity._id}>
            {activity.name || activity.type} — {activity.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;