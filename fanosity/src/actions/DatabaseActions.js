import {
    CURRENT_BAND_PLAYING_UPDATE,
    CURRENT_BAND_FETCH_SUCCESS,
    FETCH_ARTISTS,
    FETCH_BANDS,
    FETCH_SPONSORS,
    ADD_AWARD,
    GET_CURRENT_BAND
    // GET_BAND_INDEX_BY_ID
} from "./types";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const fetchArtists = () => {
    return {
        type: FETCH_ARTISTS
    };
};

export const fetchBands = () => {
    return {
        type: FETCH_BANDS
    };
};

// export const getBandIndexById = bandId => {
//     return {
//         type: GET_BAND_INDEX_BY_ID,
//         payload: bandId
//     };
// };

export const fetchSponsors = () => {
    return {
        type: FETCH_SPONSORS
    };
};

export const addAward = awardId => {
    return {
        type: ADD_AWARD,
        payload: awardId
    };
};

export const currentBandFetch = () => {
    return dispatch => {
        firebase
            .database()
            .ref("/currentband")
            .on("value", snapshot => {
                // snapshot wraps the data in metadata details about the data. the data in users/uid/employees is in snapshot.val().
                // any time any data is added (from anywhere in our db), firebase will dispatch this action.
                // this one action creator watches our data source for our apps entire life cycle.
                dispatch({ type: CURRENT_BAND_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const getCurrentBand = () => {
    return {
        type: GET_CURRENT_BAND,
        payload: 4 // Replace with api call.
    };
};
