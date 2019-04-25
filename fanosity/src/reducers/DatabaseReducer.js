import { CURRENT_BAND_FETCH_SUCCESS, GET_CURRENT_BAND } from '../actions/types';
import bands from "../data/Bands.json";

const INITIAL_STATE = {currentBand: ''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case CURRENT_BAND_FETCH_SUCCESS:
            // return {...state, [id]: action.payload};
            return {currentBand: action.payload};
        case GET_CURRENT_BAND:
            return {currentBand: bands.find(band => band.id == action.payload) };
        default:
            return state;
    }
};