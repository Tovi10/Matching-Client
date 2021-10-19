import { combineReducers } from 'redux';

import generalReducer from './general.reducer';
import userReducer from './user.reducer';
import campaignReducer from './campaign.reducer';
import companyReducer from './company.reducer';
import giftReducer from './gift.reducer';
import applyReducer from './apply.reducer';
import recruiterReducer from './recruiter.reducer';

export default combineReducers({
    generalReducer,
    userReducer,
    campaignReducer,
    companyReducer,
    giftReducer,
    applyReducer,
    recruiterReducer,
});