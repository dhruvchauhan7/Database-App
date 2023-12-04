import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NoPoorReviews() {
    const [usersWithNoPoorRatings, setUsersWithNoPoorRatings] = useState([]);

    useEffect(() => {
        const fetchUsersWithNoPoorRatings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/backend/users/no_poor_reviews');
                setUsersWithNoPoorRatings(response.data);
            } catch (error) {
                console.error('Error fetching users with no poor ratings:', error);
            }
        };

        fetchUsersWithNoPoorRatings();
    }, []);

    return (
        <div>
            <h3>Users with No Poor Ratings</h3>
            <ul>
                {usersWithNoPoorRatings.map((user) => (
                    <li key={user.u_id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default NoPoorReviews;
