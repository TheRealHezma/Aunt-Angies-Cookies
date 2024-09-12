import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { thunkCreateCookie } from '../../redux/cookies';

function CreateCookieButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize the navigate function
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState(''); // New state for image URL
    const [urlError, setUrlError] = useState(''); // State to track URL validation error

    // Function to validate URL format using regex
    const isValidUrl = (url) => {
        const urlPattern = /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})(\/[\w\d\-_#]+\/?)*$/;
        return urlPattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the URL is valid
        if (!isValidUrl(url)) {
            setUrlError('Please enter a valid URL.');
            return;
        }

        const newCookie = {
            name,
            description,
            price: parseFloat(price),
            url // Add url to the new cookie object
        };

        // Dispatch the create cookie thunk
        await dispatch(thunkCreateCookie(newCookie));

        // Navigate to the /cookies page after creation
        navigate('/cookies');
    };

    const handleCancel = () => {
        // Navigate to the previous page or reset form
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
                    onChange={(e) => {
                        setUrl(e.target.value);
                        setUrlError(''); // Reset error when the user types
                    }}
                    placeholder="Must be a URL" // Set placeholder text
                    required
                />
                {urlError && <p style={{ color: 'red' }}>{urlError}</p>}
            </div>

            <button
                type="submit"
                style={{ backgroundColor: 'lightblue', border: 'none', padding: '10px', margin: '5px' }}
                disabled={!url || urlError} // Disable if URL is invalid
            >
                Create Cookie
            </button>
            <button
                type="button"
                onClick={handleCancel}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px', margin: '5px' }}
            >
                Cancel
            </button>
        </form>
    );
}

export default CreateCookieButton;
