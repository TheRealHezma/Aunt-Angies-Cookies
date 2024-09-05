import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetCookieById, thunkDeleteCookie } from '../../redux/cookies';
import { getReviews, createReview } from '../../redux/reviews';
import './CookiesDescription.css';

function CookiesDescription() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookie = useSelector(state => state.cookies.currentCookie);
    const currentUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews);

    useEffect(() => {
        if (id) {
            dispatch(thunkGetCookieById(id));
            dispatch(getReviews(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log("Reviews updated:", reviews);
        console.log('Testing reviews', reviews.review)
    }, [reviews]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this cookie?')) {
            await dispatch(thunkDeleteCookie(id));
            navigate('/cookies');
        }
    };

    const handleEdit = () => {
        navigate(`/cookies/${id}/edit`);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const review = e.target.review.value;
        const stars = e.target.stars.value;

        const newReview = {
            review,
            stars,
            cookie_id: id,
        };

        await dispatch(createReview(newReview));
        e.target.reset();
    };

    if (!cookie) {
        return <p>No cookie here</p>;
    }

    const isOwner = currentUser && cookie.ownerId === currentUser.id;

    return (
        <div className="cookie-description">
            <img src={cookie.imageUrl} alt={cookie.name} className="cookie-image" />
            <h1>{cookie.name}</h1>
            <p>{cookie.description}</p>
            <p>Price: ${cookie.price.toFixed(2)}</p>

            {isOwner && (
                <div>
                    <button onClick={handleEdit} className="edit-button">Edit</button>
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                </div>
            )}

            {/* Reviews Section */}
            <div className="reviews-section">
                <h2>Reviews</h2>
                {reviews && Object.keys(reviews).length > 0 ? (
                    <ul>
                        {Object.values(reviews).map(review => (
                            <li key={review.id}> {/* Use review.id here */}
                                <p><strong>{review.username}</strong></p> {/* Display user name */}
                                <p>{review.review}</p> {/* Access individual review */}
                                <p>Rating: {review.stars} stars</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to review this cookie!</p>
                )}

                {currentUser && (
                    <form onSubmit={handleReviewSubmit}>
                        <textarea name="review" placeholder="Write your review" required></textarea>
                        <select name="stars" required>
                            <option value="">Rate this cookie</option>
                            <option value="1">1 star</option>
                            <option value="2">2 stars</option>
                            <option value="3">3 stars</option>
                            <option value="4">4 stars</option>
                            <option value="5">5 stars</option>
                        </select>
                        <button type="submit">Submit Review</button>
                    </form>
                )}
            </div>
        </div >
    );
}

export default CookiesDescription;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { thunkGetCookieById, thunkDeleteCookie } from '../../redux/cookies';
// import { getReviews, createReview } from '../../redux/reviews';
// import './CookiesDescription.css';

// function CookiesDescription() {
//     const { id } = useParams();  // Get the cookie ID from the URL
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const cookie = useSelector(state => state.cookies.currentCookie); // Get the specific cookie from the Redux store
//     const currentUser = useSelector(state => state.session.user); // Get the current logged-in user
//     const reviews = useSelector(state => state.reviews); // Get reviews from the store

//     useEffect(() => {
//         if (id) {
//             dispatch(thunkGetCookieById(id)); // Fetch the cookie by ID when the component mounts
//             dispatch(getReviews(id)); // Fetch reviews for the cookie
//         }

//     }, [dispatch, id]);

//     const handleDelete = async () => {
//         if (window.confirm('Are you sure you want to delete this cookie?')) {
//             await dispatch(thunkDeleteCookie(id));
//             navigate('/cookies'); // Redirect to the cookies page after deletion
//         }
//     };

//     const handleEdit = () => {
//         navigate(`/cookies/${id}/edit`); // Navigate to the edit page for the cookie
//     };

//     const handleReviewSubmit = async (e) => {
//         e.preventDefault();
//         const review = e.target.review.value;
//         const stars = e.target.stars.value;

//         const newReview = {
//             review,
//             stars,
//             cookieId: id,
//         };

//         await dispatch(createReview(newReview)); // Dispatch the action to create a review
//         e.target.reset(); // Reset the form after submission
//     };

//     // Render a loading state if the cookie is not yet loaded
//     if (!cookie) {
//         return <p>Loading...</p>;
//     }

//     // Check if the current user is the owner of the cookie
//     const isOwner = currentUser && cookie.ownerId === currentUser.id;

//     return (
//         <div className="cookie-description">
//             <img src={cookie.imageUrl} alt={cookie.name} className="cookie-image" />
//             <h1>{cookie.name}</h1>
//             <p>{cookie.description}</p>
//             <p>Price: ${cookie.price.toFixed(2)}</p>

//             {isOwner && (
//                 <div>
//                     <button onClick={handleEdit} className="edit-button">Edit</button>
//                     <button onClick={handleDelete} className="delete-button">Delete</button>
//                 </div>
//             )}

//             {/* Reviews Section */}
//             <div className="reviews-section">
//                 <h2>Reviews</h2>

//                 {reviews.length > 0 ? (
//                     <ul>
//                         {reviews.map(review => (
//                             <li key={review.id}>
//                                 <p>{review.review}</p>
//                                 <p>Rating: {review.stars} stars</p>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No reviews yet. Be the first to review this cookie!</p>
//                 )}

//                 {/* Review Form */}
//                 {currentUser && (
//                     <form onSubmit={handleReviewSubmit}>
//                         <textarea name="review" placeholder="Write your review" required></textarea>
//                         <select name="stars" required>
//                             <option value="">Rate this cookie</option>
//                             <option value="1">1 star</option>
//                             <option value="2">2 stars</option>
//                             <option value="3">3 stars</option>
//                             <option value="4">4 stars</option>
//                             <option value="5">5 stars</option>
//                         </select>
//                         <button type="submit">Submit Review</button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default CookiesDescription;
