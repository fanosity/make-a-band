import { LOGIN_USER_SUCCESS, LOGIN_USER_START } from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const loginUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });
        firebase.auth().signInAnonymously()
                .then(user => loginUserSuccess(dispatch, user))
                .catch((err) => { console.log("Login error: " + err)});
    };
};


const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.main();
};