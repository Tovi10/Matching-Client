import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    campaignId: null,
    companyId: null,
    giftId: null,
    currentNotification: null,
}

const generalReducer = {
    setCampaignId(state, action) {
        state.campaignId = action.payload;
    },
    setCompanyId(state, action) {
        state.companyId = action.payload;
    },
    setGiftId(state, action) {
        state.giftId = action.payload;
    },
    setCurrentNotification(state, action) {
        state.currentNotification = action.payload;
    },
    zeroCurrentNotification(state, action) {
        state.currentNotification = null;
    },
}
export default produce((state, action) => createReducer(state, action, generalReducer), initialState);