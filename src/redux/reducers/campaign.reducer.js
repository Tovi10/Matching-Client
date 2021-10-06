import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    allCampaigns: null,
    campaign: null,   
}

const campaignReducer = {
    setAllCampaigns(state, action) {
        state.allCampaigns = action.payload;
    },
    setCampaign(state, action) {
        state.campaign = state.allCampaigns.find(campaign => campaign._id === action.payload);
    },
    setCampaignFromServer(state, action) {
        state.campaign = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, campaignReducer), initialState);