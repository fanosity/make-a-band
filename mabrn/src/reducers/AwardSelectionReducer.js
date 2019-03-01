import { SELECT_AWARD } from '../actions/types';

export default (state = null, action) => {
    switch(action.type)
    {
        case SELECT_AWARD:
            if(state === action.payload){
                return -1;
            }
            return action.payload;
        default:
            return state;
    }
}