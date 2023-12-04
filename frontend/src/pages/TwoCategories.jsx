import React, { useState } from 'react';
import axios from 'axios';
import "../style.scss";

const TwoCategories = () => {
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/backend/users/two_categories', {
        category1,
        category2,
      });

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="TwoCategories">
      <form onSubmit={handleSubmit}>
        <label>
          Category 1:
          <input
            type="text"
            value={category1}
            onChange={(e) => setCategory1(e.target.value)}
          />
        </label>
        <label>
          Category 2:
          <input
            type="text"
            value={category2}
            onChange={(e) => setCategory2(e.target.value)}
          />
        </label>
        <button type="submit">Find Users</button>
      </form>

      <div>
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.u_id}>
                {user.username} (ID: {user.u_id})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TwoCategories;
