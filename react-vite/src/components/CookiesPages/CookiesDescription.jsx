import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetCookieById, thunkDeleteCookie } from '../../redux/cookies';
import './CookiesDescription.css';

function CookiesDescription() {
    const { id } = useParams();  // Get the cookie ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookie = useSelector(state => state.cookies.currentCookie); // Get the specific cookie from the Redux store
    const currentUser = useSelector(state => state.session.user); // Get the current logged-in user

    useEffect(() => {
        if (id) {
            dispatch(thunkGetCookieById(id)); // Fetch the cookie by ID when the component mounts
        }
    }, [dispatch, id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this cookie?')) {
            await dispatch(thunkDeleteCookie(id));
            navigate('/cookies'); // Redirect to the cookies page after deletion
        }
    };

    const handleEdit = () => {
        navigate(`/cookies/${id}/edit`); // Navigate to the edit page for the cookie
    };

    // Render a loading state if the cookie is not yet loaded
    if (!cookie) {
        return <p>Loading...</p>;
    }

    // Check if the current user is the owner of the cookie
    const isOwner = currentUser && cookie.ownerId === currentUser.id;

    return (
        <div className="cookie-description">
            <img src={cookie.imageUrl} alt={cookie.name} className="cookie-image" />
            <h1>{cookie.name}</h1>
            <p>{cookie.description}</p>
            <p>Price: ${cookie.price.toFixed(2)}</p>

            {/* {isOwner && ( */}
            <div>
                <button onClick={handleEdit} className="edit-button">Edit</button>
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
            {/* )} */}
        </div>
    );
}

export default CookiesDescription;
