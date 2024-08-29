//*VARIABLE TYPES
const GET_ALL_COOKIES = 'cookies/GET_ALL_COOKIES';
const GET_COOKIES_BY_ID = 'cookies/GET_COOKIES_BY_ID';
const CREATE_COOKIE = 'cookies/CREATE';
const EDIT_COOKIE = 'cookies/EDIT';
const DELETE_COOKIE = 'cookies/DELETE';

//*ACTIONS
const getAllCookies = (cookies) => ({
    type: GET_ALL_COOKIES,
    cookies,
});

const getCookieById = (cookie) => ({
    type: GET_COOKIES_BY_ID,
    cookie,
});

const createCookie = (cookie) => ({
    type: CREATE_COOKIE,
    cookie,
});

const editCookie = (cookie) => ({
    type: EDIT_COOKIE,
    cookie,
});

const deleteCookie = (cookieId) => ({
    type: DELETE_COOKIE,
    cookieId,
});

//*THUNKS
export const thunkGetAllCookies = () => async (dispatch) => {
    const response = await fetch('/api/cookies/');
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllCookies(data));
    }
};

export const thunkGetCookieById = (id) => async (dispatch) => {
    const response = await fetch(`/api/cookies/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getCookieById(data));
    }
};

export const thunkCreateCookie = (cookieData) => async (dispatch) => {
    const response = await fetch('/api/cookies/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cookieData),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createCookie(data));
    }
};

export const thunkEditCookie = (id, cookieData) => async (dispatch) => {
    const response = await fetch(`/api/cookies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cookieData),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editCookie(data));
    } else {
        console.error("Failed to edit the cookie.");
    }
};

export const thunkDeleteCookie = (id) => async (dispatch) => {
    const response = await fetch(`/api/cookies/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteCookie(id));
    }
};

//*INITIAL STATE + REDUCER
const initialState = {
    allCookies: {},
    currentCookie: null,
};

export default function cookiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COOKIES:
            const allCookies = {};
            action.cookies.forEach((cookie) => {
                allCookies[cookie.id] = cookie;
            });
            return { ...state, allCookies };

        case GET_COOKIES_BY_ID:
            return { ...state, currentCookie: action.cookie };

        case CREATE_COOKIE:
            return {
                ...state,
                allCookies: { ...state.allCookies, [action.cookie.id]: action.cookie }
            };

        case EDIT_COOKIE:
            return {
                ...state,
                allCookies: { ...state.allCookies, [action.cookie.id]: action.cookie },
                currentCookie: action.cookie, // Update currentCookie to reflect the changes
            };

        case DELETE_COOKIE:
            const newState = { ...state };
            delete newState.allCookies[action.cookieId];
            return newState;

        default:
            return state;
    }
}
