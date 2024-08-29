// function EditCookieForm() {
//     return (
//         <h2>Here is the Edit</h2>
//     )
// }
// export default EditCookieForm
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
        }
    }, [cookie]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCookie = {
            id,  // Ensure the ID is included for updating
            name,
            description,
            price: parseFloat(price)
        };

        console.log('Updating cookie with data:', updatedCookie);


        // Dispatch the update cookie thunk
        await dispatch(thunkEditCookie(id, updatedCookie));

        // Navigate to the /cookies page after updating
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

            <button type="submit">Submit</button>
        </form>
    );
}

export default EditCookieForm;
