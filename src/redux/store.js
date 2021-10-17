import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { getUserByUid,updateUser } from './middleware/user.crud';
import { getAllCampaigns,getCampaignById, createCampaign, updateCampaign, } from './middleware/campaign.crud';
import { getAllGifts, createGift, getGiftById,updateGift } from './middleware/gift.crud';
import { createCard } from './middleware/card.crud';
import { getAllCompanies, createCompany, updateCompany } from './middleware/company.crud';
import { setCurrentNotification } from './middleware/general.crud';
import { createDonation } from './middleware/donation.crud';
import { createRecruiter } from './middleware/recruiter.crud';
import { createApply, getApplies } from './middleware/apply.crud';

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk,
        getUserByUid,
        updateUser,
        getAllCampaigns,
        getCampaignById,
        createCampaign,
        updateCampaign,
        createGift,
        updateGift,
        getGiftById,
        getAllGifts,
        createCard,
        getAllCompanies,
        createCompany,
        updateCompany,
        setCurrentNotification,
        createDonation,
        createRecruiter,
        createApply,
        getApplies,
    )));

export default store;