import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/authContext"
import { Link } from 'react-router-dom';
import '../style.scss'; // Import your SCSS file

function Favourite() {
  const { currentUser } = useContext(AuthContext)

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');

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
      setUsers(data.filter(user => user.u_id !== currentUser?.u_id)); // Exclude current user
    } catch (error) {
      console.error('Error fetching users:', error.message);
      // Handle error in UI
    }
  };

  const handleUserSelection = (userId, username) => {
    setSelectedUserId(userId);
    setSelectedUsername(username);
  };

  const updateFavorite = async () => {
    if (!currentUser?.u_id || !selectedUsername) {
      console.error('No user selected');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/backend/users/favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ u_id: currentUser?.u_id, fav: selectedUsername }),
      });
      if (!response.ok) {
        throw new Error('Failed to update favorite');
      }
      const result = await response.json();
      alert('Favourite user updated');
      console.log('Favorite updated:', result.message);
      // Refresh user data after updating favorite
      getAllUsers();
    } catch (error) {
      console.error('Error updating favorite:', error.message);
      // Handle error in UI
    }
  };

  return (
    <div className="favourite-container">
      <Link to="/favourite2" className="favourite-button">
        <button>Compare Favourites</button>
      </Link>
      <label>
        Current User ID:
        <input
          type='text'
          name='u_id'
          defaultValue={currentUser?.u_id}
          readOnly
          className="current-user-id"
        />
      </label>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.u_id}>
            <label className="user-label">
              <input
                type="radio"
                name="userSelection"
                value={user.u_id}
                onChange={() => handleUserSelection(user.u_id, user.username)}
              />
              {user.username}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={updateFavorite} className="update-favourite-button">
        Update Favourite
      </button>
    </div>
  );
};

export default Favourite;
