export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SHOW_LOCK = 'SHOW_LOCK';
export const LOCK_SUCCESS = 'LOCK_SUCCESS';
export const LOCK_ERROR = 'LOCK_ERROR';

function showLock() {
    return {
        type: SHOW_LOCK
    }
}

function lockSuccess(profile, token) {
    return {
        type: LOCK_SUCCESS,
        profile,
        token
    }
}

function lockError(err) {
    return {
        type: LOCK_ERROR,
        err
    }
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function loginUser(creds) {

    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `username=${creds.username}&password=${creds.password}`
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));

        return fetch('http://localhost:3001/sessions/create', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginError(user.message));
                    return Promise.reject(user)
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', user.id_token);
                    localStorage.setItem('id_token', user.access_token);
                    // Dispatch the success action
                    dispatch(receiveLogin(user))
                }
            }).catch(err => console.log("Error: ", err))
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        dispatch(receiveLogout())
    }
}