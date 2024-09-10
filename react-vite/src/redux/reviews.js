// Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEWS'; //added

// Action Creators
const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
});

const clearReviews = () => ({ //added
    type: CLEAR_REVIEWS,
});

// Thunks

// Get reviews for a specific cookie
export const getReviews = (cookieId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/cookies/${cookieId}/reviews`); // Corrected endpoint
        if (response.ok) {
            const reviews = await response.json();
            // Only dispatch if reviews exist
            if (reviews.length > 0) {
                dispatch(loadReviews(reviews));
            } else {
                // If no reviews are found, you can choose to dispatch an empty action or simply do nothing
                // This will keep the reviews state as empty if no reviews are found
                dispatch(loadReviews([])); // Dispatching empty array or object if needed
            }
        } else {
            // Handle response errors gracefully, for example, by returning empty reviews
            // console.warn('No reviews found or failed to load reviews'); // Changed to warn
            dispatch(loadReviews([])); // Ensure reviews are cleared or set as empty
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        // Handle errors in fetch operation
        dispatch(loadReviews([])); // Ensure reviews are cleared or set as empty
    }
};


export const createReview = (cookieId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/cookies/${cookieId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });
    // console.log("AAAAAAAAAAAA", cookieId)
    // console.log('BBBBBBBBBBBBBB', reviewData)
    // console.log('Response object:', response);  // Log the response object

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        return newReview;
    } else {
        const error = await response.json();
        console.error('Failed to create review', error);
        return false;  // Return false if request fails
    }
};


// // Create a new review for a specific cookie
// export const createReview = (cookieId, reviewData) => async (dispatch) => {
//     const response = await fetch(`/api/cookies/${cookieId}/reviews`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(reviewData),
//     });

//     if (response.ok) {
//         const newReview = await response.json();
//         dispatch(addReview(newReview));
//         return newReview;
//     } else {
//         const error = await response.json();
//         console.error('Failed to create review', error);
//     }
// };

// Edit an existing review by its ID
export const editReview = (reviewId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(updateReview(updatedReview));
        return updatedReview;
    } else {
        const error = await response.json();
        console.error('Failed to update review', error);
    }
};

// Delete a review by its ID
export const removeReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteReview(reviewId));
    } else {
        const error = await response.json();
        console.error('Failed to delete review', error);
    }
};

export const clearReviewsState = () => (dispatch) => { //added
    dispatch(clearReviews());
};


// Reviews Reducer
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {};
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        }
        case ADD_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review,
            };
        }
        case UPDATE_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review,
            };
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        case CLEAR_REVIEWS: {
            return {};
        }
        default:
            return state;
    }
};

export default reviewsReducer;
