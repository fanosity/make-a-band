import { SELECT_DATA_ITEM, DESELECT_DATA_ITEM } from '../actions/types';

const EMPTY_DATA_ITEM = { id: -1, title: "", desc: "", bio: "", image: ""};

export default (state = EMPTY_DATA_ITEM, action) => {
    switch(action.type)
    {
        case SELECT_DATA_ITEM:
            if(state === action.payload){
                return EMPTY_DATA_ITEM;
            }
            return action.payload;
        case DESELECT_DATA_ITEM:
            return EMPTY_DATA_ITEM;
        default:
            return state;
    }
}