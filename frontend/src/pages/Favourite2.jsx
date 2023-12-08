import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss'; // Import your SCSS file

function Favourite2() {
  const [users, setUsers] = useState([]);
  const [selectedUser1, setSelectedUser1] = useState('');
  const [selectedUser2, setSelectedUser2] = useState('');
  const [commonFavourite, setCommonFavourite] = useState('');

  useEffect(() => {
    // Fetch all users when the component mounts
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/backend/users/allusers');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      // Handle error in UI
    }
  };

  const handleUserSelection = (event) => {
    const { name, value } = event.target;
    if (name === 'user1') {
      setSelectedUser1(value);
    } else if (name === 'user2') {
      setSelectedUser2(value);
    }
  };

  const findCommonFavourite = async () => {
    if (!selectedUser1 || !selectedUser2) {
      console.error('Please select both users');
      alert('Please select both users');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/backend/users/commonfavourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1: selectedUser1, user2: selectedUser2 }),
      });
      if (!response.ok) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        alert('Failed to find common favourite');
        throw new Error('Failed to find common favourite');
      }
      const result = await response.json();
      setCommonFavourite(result.commonFavourite);
      console.log('Common favourite:', result.commonFavourite);
      alert('Common favourite:', result.commonFavourite);
    } catch (error) {
      console.error('Error finding common favourite:', error.message);
      // Handle error in UI
    }
  };

  return (
    <div className="favourite2-container">
      <Link to="/favourite" className="favourite-button">
        <button>Back</button>
      </Link>

      <label>
        Select User 1:
        <select name="user1" value={selectedUser1} onChange={handleUserSelection}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.u_id} value={user.u_id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select User 2:
        <select name="user2" value={selectedUser2} onChange={handleUserSelection}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.u_id} value={user.u_id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <button onClick={findCommonFavourite}>Find Common Favourite</button>
      {commonFavourite && <p>Common Favourite: {commonFavourite}</p>}
    </div>
  );
}

export default Favourite2;
