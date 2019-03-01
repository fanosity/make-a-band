import { FETCH_ARTISTS, FETCH_BANDS } from '../actions/types';
import artists from '../data/Artists.json';
import bands from '../data/Bands.json';

const INITIAL_STATE = {data: []}

export default (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case FETCH_ARTISTS:
            return {data: artists};
        case FETCH_BANDS:
            return {data: bands};
        default:
            return state;
    }
};