import { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data.results || data.items || data.data || [];
        setWorkouts(list);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error loading workouts: {error}</div>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id || workout._id}>
            {workout.name} — {workout.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;