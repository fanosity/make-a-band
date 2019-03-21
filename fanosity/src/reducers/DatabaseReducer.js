import { CURRENT_BAND_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {currentBand: ''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case CURRENT_BAND_FETCH_SUCCESS:
            // return {...state, [id]: action.payload};
            return {currentBand: action.payload};
        default:
            return state;
    }
};