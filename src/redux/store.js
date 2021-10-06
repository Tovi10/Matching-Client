import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { getUser } from './middleware/user.crud';
import { getAllCampaigns,getCampaignById, createCampaign, updateCampaign, } from './middleware/campaign.crud';
import { getAllGifts, createGift, getGiftById,updateGift } from './middleware/gift.crud';
import { createCard } from './middleware/card.crud';
import { getAllCompanies, createCompany, updateCompany } from './middleware/company.crud';
import { setCurrentNotification } from './middleware/general.crud';

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk,
        getUser,
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
    )));

export default store;