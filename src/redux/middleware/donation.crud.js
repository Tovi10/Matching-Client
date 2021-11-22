import axios from "axios";
import { SERVER_URL } from "../../constants"
import { actions } from "../actions";

export const createDonation = store => next => action => {
    if (action.type === 'CREATE_DONATION') {
        axios.post(`${SERVER_URL}/api/donation/createDonation/${store.getState().generalReducer.donationData.campaignId}/${store.getState().userReducer.user.uid}`, store.getState().generalReducer.donationData)
            .then(result => {
                console.log("🚀 ~ file: donation.crud.js ~ line 8 ~ result", result);
                store.dispatch(actions.setCampaignFromServer(result.data.campaign));
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
                store.dispatch(actions.setUser(result.data.user));
                store.dispatch(actions.setResetDonate(true))
                store.getState().socketReducer.socket.emit('newDonation', { room: result.data.campaign._id,donation:result.data.donation });
            })
            .catch(error => {
                console.log("🚀 ~ file: donation.crud.js ~ line 14 ~ error", error);
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת התרומה!'));
            })
    }
    return next(action)
}

export const getDonationsByRecruiterId = store => next => action => {
    if (action.type === 'GET_DONATIONS_BY_RECRUITER_ID') {
        axios.get(`${SERVER_URL}/api/donation/getDonationsByRecruiterId/${action.payload.recruiterId}`)
            .then(result => {
                console.log("🚀 ~ file: donation.crud.js ~ line 25 ~ result", result);
                store.dispatch(actions.setRecruiterDonations(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: donation.crud.js ~ line 28 ~ error", error);
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה בקבלת התרומות לתורם זה!'));
            });
    }
    return next(action);
}