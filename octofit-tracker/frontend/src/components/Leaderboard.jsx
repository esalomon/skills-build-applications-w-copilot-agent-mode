import { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${apiBaseUrl}/api/leaderboard/`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
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