import { combineReducers } from 'redux';

import generalReducer from './general.reducer';
import userReducer from './user.reducer';
import campaignReducer from './campaign.reducer';
import companyReducer from './company.reducer';
import giftReducer from './gift.reducer';

export default combineReducers({
    generalReducer,
    userReducer,
    campaignReducer,
    companyReducer,
    giftReducer,
});