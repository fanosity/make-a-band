import { SELECT_AWARD } from '../actions/types';

export default (state = null, action) => {
    switch(action.type)
    {
        case SELECT_AWARD:
            console.log("\tin award selection REDUCER. State: " + state + "   payload: " + action.payload);
            if(state === action.payload){
                return -1;
            }
            return action.payload;
        default:
            return -1;
    }
}