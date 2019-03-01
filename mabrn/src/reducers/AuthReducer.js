// This reducer handles everything to do with authentication, 
// including email and password entered, decide if we show an error, and decide if we should show an activity indicator

import { LOGIN_USER_SUCCESS, LOGIN_USER_START } from '../actions/types';
const INITIAL_STATE = { user: null, loading: false };

export default (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case LOGIN_USER_SUCCESS:
            return { loading: false, user: action.payload };
        case LOGIN_USER_START:
            return { ...state, loading: true};
        default:
            return state;
    }
};
