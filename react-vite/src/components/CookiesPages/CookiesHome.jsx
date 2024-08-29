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
                            <img src={cookie.imageUrl} alt={cookie.name} className="cookie-image" />
                            <h2>{cookie.name}</h2>
                            <p>Price: ${cookie.price.toFixed(2)}</p>
                        </NavLink>
                    ))
                )}
            </div>
        </div>
    );
}

export default CookiesHome;
