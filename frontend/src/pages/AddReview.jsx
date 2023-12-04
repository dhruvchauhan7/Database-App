// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from "../context/authContext"
// import { useParams, useNavigate } from 'react-router-dom';
// import '../style.scss';

// const AddReview = ({ match }) => {
//     const [reviewText, setReviewText] = useState('');
//     const [rating, setRating] = useState(''); // State to hold selected rating
//     const { p_id } = useParams();

//     const { currentUser } = useContext(AuthContext)

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         const u_id = currentUser?.u_id;

//         try {
//             await axios.post(`http://localhost:8080/backend/products/products/${p_id}/addReview`, {
//                 p_id,
//                 u_id,
//                 reviewText,
//                 rating,
//             });
//             alert("Review Added Successfully!");
//             navigate("/products");


//         } catch (error) {
//             console.error('Error submitting review:', error);

//         }
//     };

//     const handleRatingChange = (e) => {
//         setRating(e.target.value);
//     };

//     return (
//         <div className="add-review-container">
//             <h2>Add Review</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>DEFAULT USER-ID:
//                     <input
//                             type='text'
//                             name='u_id'
//                             defaultValue={currentUser?.u_id}
//                             readOnly>
//                         </input>
//                     </label>
//                     <label>
//                         Review Text:
//                     <textarea
//                             value={reviewText}
//                             onChange={(e) => setReviewText(e.target.value)}
//                             required
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Rating:
//                          <select value={rating} onChange={handleRatingChange} required>
//                             <option value="">Select Rating</option>
//                             <option value="excellent">Excellent</option>
//                             <option value="good">Good</option>
//                             <option value="fair">Fair</option>
//                             <option value="bad">Bad</option>
//                         </select>
//                     </label>
//                 </div>
//                 <button type="submit">Submit Review</button>
//             </form>
//         </div>
//     );
// };

// export default AddReview;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/authContext"
import { useParams, useNavigate } from 'react-router-dom';
import '../style.scss';

const AddReview = () => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const { p_id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [dailyReviewCount, setDailyReviewCount] = useState(0);
    const [isExceedingReviewLimit, setIsExceedingReviewLimit] = useState(false);

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/backend/reviews/${currentUser?.u_id}/dailyCount`)
    //         .then(res => {
    //             setDailyReviewCount(res.data.count);
    //         })
    //         .catch(err => console.log(err));
    // }, [currentUser?.u_id]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const u_id = currentUser?.u_id;

    //     // Check if the user has exceeded the daily review limit
    //     if (dailyReviewCount > 3) {
    //         alert('You have reached the daily limit of 3 reviews.');
    //         return;
    //     }

    //     try {
    //         await axios.post(`http://localhost:8080/backend/products/products/${p_id}/addReview`, {
    //             p_id,
    //             u_id,
    //             reviewText,
    //             rating,
    //         });
    //         alert("Review Added Successfully!");
    //         navigate("/products");
    //         setDailyReviewCount(prevCount => prevCount + 1);
    //     } catch (error) {
    //         console.error('Error submitting review:', error);
    //     }
    // };

    useEffect(() => {
        axios.get(`http://localhost:8080/backend/reviews/${currentUser?.u_id}/dailyCount`)
            .then(res => {
                setDailyReviewCount(res.data.count);
                setIsExceedingReviewLimit(res.data.count > 3);
            })
            .catch(err => console.log(err));
    }, [currentUser?.u_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const u_id = currentUser?.u_id;

        if (isExceedingReviewLimit) {
            alert('You have reached the daily limit of 3 reviews.');
            return;
        }

        try {
            await axios.post(`http://localhost:8080/backend/products/products/${p_id}/addReview`, {
                p_id,
                u_id,
                reviewText,
                rating,
            });
            alert("Review Added Successfully!");
            navigate("/products");
            setDailyReviewCount(prevCount => prevCount + 1);
            setIsExceedingReviewLimit(dailyReviewCount + 1 >= 3);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    return (
        <div className="add-review-container">
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>DEFAULT USER-ID:
                        <input
                            type='text'
                            name='u_id'
                            defaultValue={currentUser?.u_id}
                            readOnly
                        />
                    </label>
                    <label>
                        Review Text:
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Rating:
                        <select value={rating} onChange={handleRatingChange} required>
                            <option value="">Select Rating</option>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="bad">Bad</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
