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

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    onChange={(e) => setUrl(e.target.value)} // Set imageUrl state
                    required
                />
            </div>

            <button type="submit">Create Cookie</button>
        </form>
    );
}

export default CreateCookieButton;


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { thunkCreateCookie } from '../../redux/cookies';

// function CreateCookieButton() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate(); // Initialize the navigate function
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const newCookie = {
//             name,
//             description,
//             price: parseFloat(price)
//         };

//         // Dispatch the create cookie thunk
//         await dispatch(thunkCreateCookie(newCookie));

//         // Navigate to the /cookies page after creation
//         navigate('/cookies');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             </div>

//             <div>
//                 <label htmlFor="description">Description:</label>
//                 <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                 />
//             </div>

//             <div>
//                 <label htmlFor="price">Price:</label>
//                 <input
//                     type="number"
//                     id="price"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required
//                 />
//             </div>

//             <button type="submit">Create Cookie</button>
//         </form>
//     );
// }

// export default CreateCookieButton;
