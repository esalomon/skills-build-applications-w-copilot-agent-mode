import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${apiBaseUrl}/api/users/`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setUsers(list);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error loading users: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id || user._id}>{user.username || user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;