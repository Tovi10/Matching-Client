import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import { createUser, getUserByUid, updateUser } from './middleware/user.crud';
import { getAllCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign, } from './middleware/campaign.crud';
import { getAllGifts, createGift, getGiftById, updateGift, deleteGift } from './middleware/gift.crud';
import { createCard, deleteCard, updateCard } from './middleware/card.crud';
import { getAllCompanies, createCompany, updateCompany } from './middleware/company.crud';
import { setCurrentNotification } from './middleware/general.crud';
import { createDonation, getDonationsByRecruiterId } from './middleware/donation.crud';
import { createRecruiter, updateRecruiterDetails, getRecruiterById, updateRecruiter, deleteRecruiter } from './middleware/recruiter.crud';
import { confirmApply, createApply, getApplies } from './middleware/apply.crud';

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
        getDonationsByRecruiterId,
        createRecruiter,
        updateRecruiterDetails,
        getRecruiterById,
        createApply,
        getApplies,
        confirmApply,
        createUser,
        deleteCampaign,
        updateCard,
        deleteCard,
        updateRecruiter,
        deleteRecruiter,
        deleteGift,
    )));

export default store;