import { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${apiBaseUrl}/api/teams/`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
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