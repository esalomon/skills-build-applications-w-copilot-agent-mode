import { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${apiBaseUrl}/api/workouts/`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
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