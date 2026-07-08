import { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data.results || data.items || data.data || [];
        setLeaders(list);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error loading leaderboard: {error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {leaders.map((entry) => (
          <li key={entry.id || entry._id}>
            {entry.username || entry.name} — {entry.points ?? entry.score} pts
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;