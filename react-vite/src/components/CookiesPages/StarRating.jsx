import React, { useState } from 'react';
import './StarRating.css';  // Ensure you add appropriate CSS for the stars.

const StarRating = ({ rating, onChange }) => {
    const [hovered, setHovered] = useState(null);

    const handleMouseEnter = (index) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const handleClick = (index) => {
        onChange(index + 1);  // 1-based star index
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={`star ${index < (hovered ?? rating) ? 'filled' : ''}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                >
                    &#9733; {/* This is the star character */}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
