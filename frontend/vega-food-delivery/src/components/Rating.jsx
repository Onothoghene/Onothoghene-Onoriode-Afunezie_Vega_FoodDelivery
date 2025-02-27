import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ itemId, currentRating, onRatingChange }) => {
    const [rating, setRating] = useState(currentRating);
    const [hover, setHover] = useState(null);

    const handleRating = (newRating) => {
        setRating(newRating);
        onRatingChange(newRating);
        // Simulate API call
        console.log(`User rated item ${itemId} with ${newRating} stars`);
    };

    return (
        <div className="mb-3">
            <strong>Item Ratings:</strong>
            <div>
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            className="star"
                            size={20}
                            color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(null)}
                            onClick={() => handleRating(starValue)}
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Rating;
