import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css';
import chocChipImage from '../../../../prepWork/choc_chip_cookies.jpg';
import gojo_chibi from '../../../../prepWork/Gojo_sugar_cookie.jpg';
import pokemonSugarCook from '../../../../prepWork/Pokemon_sugar_cook.jpg';
import pumpkinFallSugarCook from '../../../../prepWork/Pumpkin_fall_Suger_cook.jpg';

export default function HomePage() {
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    const handleClick = () => {
        if (sessionUser) {
            navigate('/cookies');
        }
    };

    const sections = [
        {
            image: chocChipImage,
            text: "Welcome to Aunt Angie's Cookies! Discover our delicious selection of homemade cookies.",
        },
        {
            image: gojo_chibi,
            text: "Our cookies are made with love and the finest ingredients, ensuring every bite is a treat.",
        },
        {
            image: pokemonSugarCook,
            text: "Try our fun and colorful Pokemon sugar cookies! They're a hit with kids and adults alike.",
        },
        {
            image: pumpkinFallSugarCook,
            text: "Celebrate the fall season with our special Pumpkin Fall Sugar Cookies, perfect for any autumn gathering.",
        },
    ];

    return (
        <div className="homepage-container">
            {sections.map((section, index) => (
                <div
                    className={`homepage-content ${index % 2 === 0 ? '' : 'reverse-layout'}`}
                    key={index}
                >
                    <div className="homepage-image">
                        <img src={section.image} alt="Delicious Cookies" />
                    </div>
                    <div className="homepage-text">
                        <p>{section.text}</p>
                    </div>
                </div>
            ))}
            <button
                onClick={handleClick}
                disabled={!sessionUser}
                className={sessionUser ? 'active-button' : 'disabled-button'}
            >
                {sessionUser ? 'See All Cookies' : 'Please Log In'}
            </button>
            <footer>Creator: Hemza Mansour </footer>
        </div>
    );
}
