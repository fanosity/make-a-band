import { FETCH_ARTISTS, FETCH_BANDS, FETCH_SPONSORS, ADD_AWARD } from '../actions/types';
import artists from '../data/Artists.json';
import bands from '../data/Bands.json';

const INITIAL_STATE = {data: [], currentPage: "", givenAwards: {}}

export default (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case FETCH_ARTISTS:
            return {...state, data: artists, currentPage: "artists"};
        case FETCH_BANDS:
            return {...state, data: bands, currentPage: "bands"};
        case FETCH_SPONSORS:
            return {...state, data: [], currentPage: "sponsors"};
        case ADD_AWARD:
            if (state.currentPage !== "")
            {
                if (!(state.currentPage in state.givenAwards))
                {
                    state.givenAwards[state.currentPage] = [];
                }
                state.givenAwards[state.currentPage].push(action.payload);
            }
            return {...state }
        default:
            return state;
    }
};
