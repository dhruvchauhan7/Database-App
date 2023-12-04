import React from 'react';
import axios from 'axios';
import "../style.scss";

const InitializeDatabase = () => {
  const handleResetTables = async () => {
    try {
      // Make a POST request to trigger the tables reset
      const response = await axios.post('http://localhost:8080/backend/auth/initialize_database'); // Assuming your backend API is hosted at '/api'

      console.log(response.data); // Log success message
      alert("Database initialized successfully");
    } catch (error) {
      console.error('Error resetting tables:', error);
    }
  };

  return (
      <div className='initialize'>
      <h1>Do you really want to initialize the database?</h1>
    <button onClick={handleResetTables}>Initialize Database</button>
    </div>
  );
};

export default InitializeDatabase;
