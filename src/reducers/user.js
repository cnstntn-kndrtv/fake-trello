import { IS_LOGGED_IN, LOGIN, LOGIN_FETCH } from '../actions';

let initialState = {
    isLoggedIn: false,
    request: false,
    error: false,
}

function user(state = initialState, action) {

    switch (action.type) {
        case IS_LOGGED_IN : {
            let isLoggedIn = document.cookie.split('=')[1];
            isLoggedIn = isLoggedIn || false;
            isLoggedIn = (isLoggedIn == 'false') ? false : isLoggedIn;
            isLoggedIn = (isLoggedIn == 'true') ? true : isLoggedIn;
            let newState = { ...state };
            newState.isLoggedIn = isLoggedIn;
            return newState;
        }

        case LOGIN : {
            let nextState = { ...state };
            nextState.isLoggedIn = true;
            return nextState;
        }

        case LOGIN_FETCH + '_REQUEST' : {
            let nextState = { ...initialState };
            nextState.request = true;
            return nextState;
        }

        case LOGIN_FETCH + '_ERROR' : {
            let nextState = { ...initialState };
            nextState.error = true;
            return nextState;
        }

        case LOGIN_FETCH + '_SUCCESS' : {
            let data = action.data;
            let nextState = { ...initialState };
            
            // handle 401
            if (!data.success) nextState.error = true;
            else nextState.isLoggedIn = true;

            return nextState;
        }

        default: {
            return state;
        }
    }
};

export default user;