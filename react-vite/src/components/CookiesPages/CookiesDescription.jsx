import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetCookieById, thunkDeleteCookie } from '../../redux/cookies';
import { getReviews, createReview, editReview, removeReview, clearReviewsState } from '../../redux/reviews';
import ConfirmDeleteModal from '../DeleteFormModal/ConfirmDeleteModal';
import { addItem, removeItem } from '../../redux/cartSlice';
import './CookiesDescription.css';
import StarRating from './StarRating'; // Import StarRating component

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
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(thunkGetCookieById(id));
            dispatch(getReviews(id));
        }

        return () => {
            dispatch(clearReviewsState());
        };
    }, [dispatch, id]);

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
        dispatch(clearReviewsState());
        setShowDeleteCookieModal(false);
        navigate('/cookies');
    };

    const handleEdit = () => {
        navigate(`/cookies/${id}/edit`);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const review = e.target.review.value;
        const stars = editReviewData.stars;

        const newReview = {
            review,
            stars,
        };

        await dispatch(createReview(id, newReview));
        e.target.reset();
    };

    const handleAddToCart = () => {
        const cookieToAdd = {
            id: cookie.id,
            name: cookie.name,
            price: cookie.price,
            url: cookie.url,
        };
        dispatch(addItem(cookieToAdd));

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
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

    const handleEditReview = (reviewId, reviewText, stars) => {
        setEditingReviewId(reviewId);
        setEditReviewData({ review: reviewText, stars });
    };

    const openDeleteReviewModal = (reviewId) => {
        setReviewToDelete(reviewId);
        setShowDeleteReviewModal(true);
    };

    const closeDeleteReviewModal = () => {
        setShowDeleteReviewModal(false);
        setReviewToDelete(null);
    };

    const handleStarChange = (newStars) => {
        setEditReviewData({ ...editReviewData, stars: newStars });
    };

    if (!cookie) {
        return <p>No cookie found</p>;
    }

    const isOwner = currentUser && cookie.user_id === currentUser.id;
    const hasUserReviewed = reviews && Object.values(reviews).some(review => review.user_id === currentUser?.id);

    return (
        <div className="cookie-description-container">
            <div className="cookie-description">
                <img src={cookie.url} alt={cookie.name} className="cookie-image-description" />
                <div className="cookie-details">
                    <h1>{cookie.name}</h1>
                    <p>{cookie.description}</p>
                    <p className="price">Price: ${cookie.price.toFixed(2)} per dozen</p>
                    <button
                        className={`add_to_cart_button ${addedToCart ? 'added' : ''}`}
                        onClick={handleAddToCart}
                        disabled={addedToCart}
                    >
                        {addedToCart ? 'Added' : 'Add to cart'}
                    </button>
                    {isOwner && (
                        <div>
                            <button onClick={handleEdit} className="edit-button">Edit</button>
                            <button onClick={handleDeleteCookie} className="delete-button">Delete</button>
                        </div>
                    )}
                </div>
            </div>

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
                                        <StarRating rating={editReviewData.stars} onChange={handleStarChange} />
                                        <button type="submit" className="save-review-button">Save Review</button>
                                        <button type="button" onClick={() => setEditingReviewId(null)} className="cancel-review-button">Cancel</button>
                                    </form>
                                ) : (
                                    <div className='theReview'>
                                        <p><strong>{review.username}</strong></p>
                                        <p>{review.review}</p>
                                        {/* <p>Rating: {review.stars} stars</p> */}
                                        <StarRating rating={review.stars} onChange={() => { }} />
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
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to review this cookie!</p>
                )}

                {/* Review Form */}
                {currentUser && !isOwner && !hasUserReviewed && (
                    <form className='review-form' onSubmit={handleReviewSubmit}>
                        <textarea name="review" placeholder="Write your review" required></textarea>
                        <StarRating rating={editReviewData.stars} onChange={handleStarChange} />
                        <button type="submit" className="submit-review-button">Submit Review</button>
                    </form>
                )}

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
