import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllCookies } from '../../redux/cookies';
import './CookiesHome.css';
import { NavLink, useNavigate } from 'react-router-dom';

function CookiesHome() {
    const dispatch = useDispatch();
    const cookies = useSelector(state => Object.values(state.cookies.allCookies)) || [];
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(thunkGetAllCookies());
    }, [dispatch]);

    const handleCreateCookie = () => {
        navigate('/cookies/new'); // This assumes you have a route for creating a new cookie
    };

    function rainCookies() {
        const numCookies = 10;
        const cookies = [];

        for (let i = 0; i < numCookies; i++) {
            const cookie = document.createElement("div");
            cookie.classList.add("cookie");

            // Initially hide the cookie
            cookie.style.display = "none";

            // Random horizontal position
            cookie.style.left = Math.random() * window.innerWidth + "px";

            // Random delay before starting the animation
            const delay = Math.random() * 2 + "s"; // Random delay between 0 and 2 seconds

            // Set the random animation duration
            cookie.style.animationDuration = 2.5 + Math.random() * 1 + "s";

            // After the delay, make the cookie visible and start the animation
            setTimeout(() => {
                cookie.style.display = "block"; // Make the cookie visible
            }, Math.random() * 2 * 1000); // Random delay before the cookie is visible

            // Append to body
            document.body.appendChild(cookie);
            cookies.push(cookie);

            // Remove cookie after animation ends
            setTimeout(() => {
                cookie.remove();
            }, 5000);
        }

        // Clean up cookies when component unmounts
        return () => {
            cookies.forEach(cookie => cookie.remove());
        };
    }

    useEffect(() => {
        const cleanup = rainCookies();
        return cleanup;
    }, []);

    useEffect(() => {
        const cleanup = rainCookies();
        return cleanup;
    }, []);


    return (
        <div>
            <div className="create-cookie-button-container">
                <button onClick={handleCreateCookie} className="create-cookie-button">
                    Create New Cookie
                </button>
            </div>

            <div className="cookies-grid">
                {cookies.length === 0 ? (
                    <p>No cookies available.</p>
                ) : (
                    cookies.map(cookie => (
                        <NavLink to={`/cookies/${cookie.id}`} key={cookie.id} className="cookie-card">
                            <img src={cookie.url} alt={cookie.name} className="cookie-image" />
                            <h2>{cookie.name}</h2>
                            <p>Price: ${cookie.price.toFixed(2)} /dozen</p>
                        </NavLink>
                    ))
                )}
            </div>
        </div>
    );
}

export default CookiesHome;
