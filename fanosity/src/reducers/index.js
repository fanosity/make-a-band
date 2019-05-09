import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DatabaseReducer from './DatabaseReducer';
import DataReducer from './DataReducer';
import DataItemSelectionReducer from './DataItemSelectionReducer';
import AwardPopupReducer from './AwardPopupReducer';
import AwardSelectionReducer from './AwardSelectionReducer';


export default combineReducers({
    // Wire the reduce up. The key is the property of state that gets produced. So the 'auth' piece of state is produced by the AuthReducer.
    auth: AuthReducer,
    band: DatabaseReducer,
    data: DataReducer,
    selectedDataItem: DataItemSelectionReducer,
    awardVisible: AwardPopupReducer,
    selectedAwardId: AwardSelectionReducer,
});
