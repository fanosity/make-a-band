import { FETCH_ARTISTS, FETCH_BANDS, FETCH_SPONSORS } from '../actions/types';
import artists from '../data/Artists.json';
import bands from '../data/Bands.json';
import awards from '../data/Awards.json';

const INITIAL_STATE = {data: [], currentPage: "", awards}

export default (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case FETCH_ARTISTS:
            return {...state, data: artists, currentPage: "artists"};
        case FETCH_BANDS:
            return {...state, data: bands, currentPage: "bands"};
        case FETCH_SPONSORS:
            return {...state, data: [], currentPage: "sponsors"};
        default:
            return state;
    }
};
