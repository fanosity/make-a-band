import { TOGGLE_AWARD_VIEW } from '../actions/types';

export default (state = false, action) => {
    switch(action.type)
    {
        case TOGGLE_AWARD_VIEW:
            return action.payload;
        default:
            return state;
    }
}