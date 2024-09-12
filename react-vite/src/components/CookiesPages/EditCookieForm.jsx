import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetCookieById, thunkEditCookie } from '../../redux/cookies';

function EditCookieForm() {
    const { id } = useParams();  // Get the cookie ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize the navigate function
    const cookie = useSelector(state => state.cookies.currentCookie); // Get the specific cookie from the Redux store

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');  // State for URL

    useEffect(() => {
        if (id) {
            dispatch(thunkGetCookieById(id)); // Fetch the cookie by ID when the component mounts
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (cookie) {
            setName(cookie.name || '');
            setDescription(cookie.description || '');
            setPrice(cookie.price || '');
            setUrl(cookie.url || '');  // Initialize URL state
        }
    }, [cookie]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCookie = {
            id,  // Ensure the ID is included for updating
            name,
            description,
            price: parseFloat(price),
            url  // Include the URL in the updated data
        };

        console.log('Updating cookie with data:', updatedCookie);

        // Dispatch the update cookie thunk
        await dispatch(thunkEditCookie(id, updatedCookie));

        // Navigate to the /cookies page after updating
        navigate('/cookies');
    };

    const handleCancel = () => {
        // Navigate to the /cookies page
        navigate('/cookies');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="url">Image URL:</label>
                <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>

            <button type="submit" style={{ backgroundColor: 'lightblue', border: 'none', padding: '10px', margin: '5px' }}>
                Submit
            </button>
            <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px', margin: '5px' }}>
                Cancel
            </button>
        </form>
    );
}

export default EditCookieForm;
