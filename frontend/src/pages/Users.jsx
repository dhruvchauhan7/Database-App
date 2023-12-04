import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Users = () => {
  const [mostProductsUser, setMostProductsUser] = useState(null);
  const staticDate = '2023-11-30'; // Define the static date here

  useEffect(() => {
    // Function to fetch most products user on a specific date
    const fetchMostProductsUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/backend/users/mostitems?staticDate=${staticDate}`);
        setMostProductsUser(response.data);
      } catch (error) {
        console.error('Error fetching most products user:', error);
      }
    };

    fetchMostProductsUser();
  }, []);

  return (
    <div>
      <Link to="/functionality"><button>BACK</button></Link>
      <br></br>
      <br></br>
      <h1>User with Most Products on {staticDate}</h1>
      {mostProductsUser ? (
        <p>
          User ID: {mostProductsUser[0].u_id}, Username: {mostProductsUser[0].username}, Products Count: {mostProductsUser[0].productCount}
        </p>
      ) : (
        <p>Loading...</p>
      )}
      
      
    </div>


  );
};

export default Users;



