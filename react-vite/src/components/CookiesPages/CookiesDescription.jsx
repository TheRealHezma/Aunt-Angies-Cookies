import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetCookieById, thunkDeleteCookie } from '../../redux/cookies';
import { getReviews, createReview, editReview, removeReview } from '../../redux/reviews';
import ConfirmDeleteModal from '../DeleteFormModal/ConfirmDeleteModal';
import './CookiesDescription.css';

function CookiesDescription() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookie = useSelector(state => state.cookies.currentCookie);
    const currentUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews);

    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editReviewData, setEditReviewData] = useState({ review: '', stars: '' });
    const [showDeleteCookieModal, setShowDeleteCookieModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(thunkGetCookieById(id));
            dispatch(getReviews(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log("Reviews updated:", reviews);
    }, [reviews]);

    const handleDeleteCookie = () => {
        setShowDeleteCookieModal(true);
    };

    const handleDeleteReview = async () => {
        if (reviewToDelete) {
            await dispatch(removeReview(reviewToDelete));
            setShowDeleteReviewModal(false);
        }
    };

    const confirmDeleteCookie = async () => {
        await dispatch(thunkDeleteCookie(id));
        setShowDeleteCookieModal(false);
        navigate('/cookies');
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
        };

        await dispatch(createReview(id, newReview));
        e.target.reset();
    };

    const handleEditReview = (reviewId, reviewText, stars) => {
        setEditingReviewId(reviewId);
        setEditReviewData({ review: reviewText, stars: stars });
    };

    const handleSaveEditedReview = async (e, reviewId) => {
        e.preventDefault();
        const updatedReview = {
            review: editReviewData.review,
            stars: editReviewData.stars,
        };

        await dispatch(editReview(reviewId, updatedReview));
        setEditingReviewId(null);
    };

    const openDeleteReviewModal = (reviewId) => {
        setReviewToDelete(reviewId);
        setShowDeleteReviewModal(true);
    };

    const closeDeleteReviewModal = () => {
        setShowDeleteReviewModal(false);
        setReviewToDelete(null);
    };

    if (!cookie) {
        return <p>No cookie found</p>;
    }

    const isOwner = currentUser && cookie.user_id === currentUser.id;

    // Check if current user has already posted a review for this cookie
    const hasUserReviewed = reviews && Object.values(reviews).some(review => review.user_id === currentUser?.id);

    return (
        <div className="cookie-description">
            <img src={cookie.imageUrl} alt={cookie.name} className="cookie-image" />
            <h1>{cookie.name}</h1>
            <p>{cookie.description}</p>
            <p>Price: ${cookie.price.toFixed(2)}</p>

            {isOwner && (
                <div>
                    <button onClick={handleEdit} className="edit-button">Edit</button>
                    <button onClick={handleDeleteCookie} className="delete-button">Delete</button>
                </div>
            )}

            {/* Reviews Section */}
            <div className="reviews-section">
                <h2>Reviews</h2>
                {reviews && Object.keys(reviews).length > 0 ? (
                    <ul className="reviews-list scrollable-reviews">
                        {Object.values(reviews).map(review => (
                            <li key={review.id}>
                                {editingReviewId === review.id ? (
                                    <form onSubmit={(e) => handleSaveEditedReview(e, review.id)}>
                                        <textarea
                                            name="review"
                                            value={editReviewData.review}
                                            onChange={(e) => setEditReviewData({ ...editReviewData, review: e.target.value })}
                                            required
                                        />
                                        <select
                                            name="stars"
                                            value={editReviewData.stars}
                                            onChange={(e) => setEditReviewData({ ...editReviewData, stars: e.target.value })}
                                            required
                                        >
                                            <option value="">Rate this cookie</option>
                                            <option value="1">1 star</option>
                                            <option value="2">2 stars</option>
                                            <option value="3">3 stars</option>
                                            <option value="4">4 stars</option>
                                            <option value="5">5 stars</option>
                                        </select>
                                        <button type="submit" className="save-review-button">Save Review</button>
                                        <button type="button" onClick={() => setEditingReviewId(null)} className="cancel-review-button">Cancel</button>
                                    </form>) : (
                                    <>
                                        <p><strong>{review.username}</strong></p>
                                        <p>{review.review}</p>
                                        <p>Rating: {review.stars} stars</p>

                                        {currentUser && currentUser.id === review.user_id && (
                                            <div>
                                                <button
                                                    onClick={() => handleEditReview(review.id, review.review, review.stars)}
                                                    className="edit-review-button"
                                                >
                                                    Edit Review
                                                </button>
                                                <button
                                                    onClick={() => openDeleteReviewModal(review.id)}
                                                    className="delete-review-button"
                                                >
                                                    Delete Review
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to review this cookie!</p>
                )}

                {/* Show the review form only if the user hasn't already reviewed the cookie and isn't the owner */}
                {currentUser && !isOwner && !hasUserReviewed && (
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

                {/* If the user has already reviewed, show a message instead of the form */}
                {hasUserReviewed && <p>You have already reviewed this cookie.</p>}
            </div>

            {/* Confirm Delete Modals */}
            {showDeleteCookieModal && (
                <ConfirmDeleteModal
                    isOpen={showDeleteCookieModal}
                    onClose={() => setShowDeleteCookieModal(false)}
                    onConfirm={confirmDeleteCookie}
                    message="Are you sure you want to delete this cookie?"
                />
            )}
            {showDeleteReviewModal && (
                <ConfirmDeleteModal
                    isOpen={showDeleteReviewModal}
                    onClose={closeDeleteReviewModal}
                    onConfirm={handleDeleteReview}
                    message="Are you sure you want to delete this review?"
                />
            )}
        </div>
    );
}

export default CookiesDescription;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { thunkGetCookieById, thunkDeleteCookie } from '../../redux/cookies';
// import { getReviews, createReview, editReview, removeReview } from '../../redux/reviews';
// import ConfirmDeleteModal from '../DeleteFormModal/ConfirmDeleteModal';
// import './CookiesDescription.css';

// function CookiesDescription() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const cookie = useSelector(state => state.cookies.currentCookie);
//     const currentUser = useSelector(state => state.session.user);
//     const reviews = useSelector(state => state.reviews);

//     const [editingReviewId, setEditingReviewId] = useState(null);
//     const [editReviewData, setEditReviewData] = useState({ review: '', stars: '' });
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [reviewToDelete, setReviewToDelete] = useState(null);

//     useEffect(() => {
//         if (id) {
//             dispatch(thunkGetCookieById(id));
//             dispatch(getReviews(id));
//         }
//     }, [dispatch, id]);

//     useEffect(() => {
//         console.log("Reviews updated:", reviews);
//     }, [reviews]);

//     const handleDelete = async () => {
//         if (window.confirm('Are you sure you want to delete this cookie?')) {
//             await dispatch(thunkDeleteCookie(id));
//             navigate('/cookies');
//         }
//     };

//     const handleEdit = () => {
//         navigate(`/cookies/${id}/edit`);
//     };

//     const handleReviewSubmit = async (e) => {
//         e.preventDefault();
//         const review = e.target.review.value;
//         const stars = e.target.stars.value;

//         const newReview = {
//             review,
//             stars,
//         };

//         await dispatch(createReview(id, newReview));
//         e.target.reset();
//     };

//     const handleEditReview = (reviewId, reviewText, stars) => {
//         setEditingReviewId(reviewId);
//         setEditReviewData({ review: reviewText, stars: stars });
//     };

//     const handleSaveEditedReview = async (e, reviewId) => {
//         e.preventDefault();
//         const updatedReview = {
//             review: editReviewData.review,
//             stars: editReviewData.stars,
//         };

//         await dispatch(editReview(reviewId, updatedReview));
//         setEditingReviewId(null);
//     };

//     const openDeleteModal = (reviewId) => {
//         setReviewToDelete(reviewId);
//         setShowDeleteModal(true);
//     };

//     const closeDeleteModal = () => {
//         setShowDeleteModal(false);
//         setReviewToDelete(null);
//     };

//     const confirmDeleteReview = async () => {
//         if (reviewToDelete) {
//             await dispatch(removeReview(reviewToDelete));
//             closeDeleteModal();
//         }
//     };

//     if (!cookie) {
//         return <p>No cookie found</p>;
//     }

//     const isOwner = currentUser && cookie.user_id === currentUser.id;

//     // Check if current user has already posted a review for this cookie
//     const hasUserReviewed = reviews && Object.values(reviews).some(review => review.user_id === currentUser?.id);

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
//                 {reviews && Object.keys(reviews).length > 0 ? (
//                     <ul className="reviews-list scrollable-reviews">
//                         {Object.values(reviews).map(review => (
//                             <li key={review.id}>
//                                 {editingReviewId === review.id ? (
//                                     <form onSubmit={(e) => handleSaveEditedReview(e, review.id)}>
//                                         <textarea
//                                             name="review"
//                                             value={editReviewData.review}
//                                             onChange={(e) => setEditReviewData({ ...editReviewData, review: e.target.value })}
//                                             required
//                                         />
//                                         <select
//                                             name="stars"
//                                             value={editReviewData.stars}
//                                             onChange={(e) => setEditReviewData({ ...editReviewData, stars: e.target.value })}
//                                             required
//                                         >
//                                             <option value="">Rate this cookie</option>
//                                             <option value="1">1 star</option>
//                                             <option value="2">2 stars</option>
//                                             <option value="3">3 stars</option>
//                                             <option value="4">4 stars</option>
//                                             <option value="5">5 stars</option>
//                                         </select>
//                                         <button type="submit">Save Review</button>
//                                         <button type="button" onClick={() => setEditingReviewId(null)}>Cancel</button>
//                                     </form>
//                                 ) : (
//                                     <>
//                                         <p><strong>{review.username}</strong></p>
//                                         <p>{review.review}</p>
//                                         <p>Rating: {review.stars} stars</p>

//                                         {currentUser && currentUser.id === review.user_id && (
//                                             <div>
//                                                 <button
//                                                     onClick={() => handleEditReview(review.id, review.review, review.stars)}
//                                                     className="edit-review-button"
//                                                 >
//                                                     Edit Review
//                                                 </button>
//                                                 <button
//                                                     onClick={() => openDeleteModal(review.id)}
//                                                     className="delete-review-button"
//                                                 >
//                                                     Delete Review
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No reviews yet. Be the first to review this cookie!</p>
//                 )}

//                 {/* Show the review form only if the user hasn't already reviewed the cookie and isn't the owner */}
//                 {currentUser && !isOwner && !hasUserReviewed && (
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

//                 {/* If the user has already reviewed, show a message instead of the form */}
//                 {hasUserReviewed && <p>You have already reviewed this cookie.</p>}
//             </div>

//             {showDeleteModal && (
//                 <ConfirmDeleteModal
//                     isOpen={showDeleteModal}
//                     onClose={closeDeleteModal}
//                     onConfirm={confirmDeleteReview}
//                     message="Are you sure you want to delete this review?"
//                 />
//             )}
//         </div>
//     );
// }

// export default CookiesDescription;
