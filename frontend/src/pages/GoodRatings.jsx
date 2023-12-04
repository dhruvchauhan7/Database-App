import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const GoodRatings = () => {
    const [username, setUsername] = useState('');
    const [productsWithGoodRatings, setProductsWithGoodRatings] = useState([]);

    const fetchProductsWithGoodRatings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/backend/users/good_ratings?username=${username}`);
            setProductsWithGoodRatings(response.data);
        } catch (error) {
            console.error('Error fetching products with good ratings:', error);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFetchProducts = () => {
        fetchProductsWithGoodRatings();
    };

    return (
        <div>
            <Link to="/functionality"><button>BACK</button></Link>
            <br></br>
            <br></br>
            <h1>Fetch Products with Good Ratings by User</h1>
            <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter username" />
            <button onClick={handleFetchProducts}>Fetch Products</button>

            <div>
                {productsWithGoodRatings.map((product, index) => (
                    <p key={index}>
                        Title: {product.title}, Rating: {product.rating}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default GoodRatings;
