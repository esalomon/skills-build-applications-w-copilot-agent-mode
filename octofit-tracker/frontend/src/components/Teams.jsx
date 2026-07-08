import { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data.results || data.items || data.data || [];
        setTeams(list);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error loading teams: {error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id || team._id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;