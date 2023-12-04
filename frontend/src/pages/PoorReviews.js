import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PoorReviews() {
    const [usersWithPoorRatings, setUsersWithPoorRatings] = useState([]);

    useEffect(() => {
        const fetchUsersWithPoorRatings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/backend/users/poor_reviews');
                setUsersWithPoorRatings(response.data);
            } catch (error) {
                console.error('Error fetching users with no poor ratings:', error);
            }
        };

        fetchUsersWithPoorRatings();
    }, []);

    return (
        <div>
            <h3>Users with Poor Ratings</h3>
            <ul>
                {usersWithPoorRatings.map((user) => (
                    <li key={user.u_id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default PoorReviews;