import {
    FETCH_ALL,
    FETCH_ARTISTS,
    FETCH_BANDS,
    FETCH_SPONSORS,
    ADD_AWARD,
    GET_BAND_INDEX_BY_ID
} from "../actions/types";
import bands from "../data/Bands.json";
import artists from "../data/Artists.json";

const INITIAL_STATE = { data: [], bands: [], artists: [], sponsors: [], currentPage: "", givenAwards: {} };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return { ...state, bands: bands, artists: artists, sponsors: [] };
        case FETCH_ARTISTS:
            return { ...state, artists: artists, currentPage: "artists" };
        case FETCH_BANDS:
            return { ...state, bands: action.payload, currentPage: "bands" };
        // case GET_BAND_INDEX_BY_ID:
        //     return {
        //         ...state,
        //         bandIndex: bands.findIndex(band => band.id == action.payload)
        //     };
        case FETCH_SPONSORS:
            return { ...state, sponsors: [], currentPage: "sponsors" };
        case ADD_AWARD:
            if (state.currentPage !== "") {
                if (!(state.currentPage in state.givenAwards)) {
                    state.givenAwards[state.currentPage] = [];
                }
                state.givenAwards[state.currentPage].push(action.payload);
            }
            return { ...state };
        default:
            return state;
    }
};
