 import {   SELECT_DATA_ITEM, 
            TOGGLE_AWARD_VIEW, 
            SELECT_AWARD } from './types.js';
 
 
 export const selectDataItem = (dataItem) => {
    return {
        type: SELECT_DATA_ITEM,
        payload: dataItem
    };
};

export const toggleAwardPopup = (visible) => {
    return{
        type: TOGGLE_AWARD_VIEW,
        payload: visible
    };
};

export const selectAward = (awardId) => {
    return {
        type: SELECT_AWARD,
        payload: awardId
    };
};
