import axios from "axios";
import { SERVER_URL } from "../../constants"
import { actions } from "../actions";

export const createDonation = store => next => action => {
    if (action.type === 'CREATE_DONATION') {
        axios.post(`${SERVER_URL}/api/donation/createDonation/${action.payload.campaignId}/${store.getState().userReducer.user.uid}`, action.payload)
            .then(result => {
                console.log("馃殌 ~ file: donation.crud.js ~ line 8 ~ result", result);
                store.dispatch(actions.setCurrentNotification('讛转专讜诪讛 砖诇讱 讛转讜讜住驻讛 讘讛爪诇讞讛!'));
                store.dispatch(actions.setCampaignFromServer(result.data.campaign));
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
                store.dispatch(actions.setUser(result.data.user));
                store.getState().socketReducer.socket.emit('newDonation', { room: result.data.campaign._id,donation:result.data.donation });
            })
            .catch(error => {
                console.log("馃殌 ~ file: donation.crud.js ~ line 14 ~ error", error);
                store.dispatch(actions.setCurrentNotification('讗专注讛 砖讙讬讗讛 讘讬爪讬专转 讛转专讜诪讛!'));
            })
    }
    return next(action)
}

export const getDonationsByRecruiterId = store => next => action => {
    if (action.type === 'GET_DONATIONS_BY_RECRUITER_ID') {
        axios.get(`${SERVER_URL}/api/donation/getDonationsByRecruiterId/${action.payload.recruiterId}`)
            .then(result => {
                console.log("馃殌 ~ file: donation.crud.js ~ line 25 ~ result", result);
                store.dispatch(actions.setRecruiterDonations(result.data));
            })
            .catch(error => {
                console.log("馃殌 ~ file: donation.crud.js ~ line 28 ~ error", error);
                store.dispatch(actions.setCurrentNotification('讗专注讛 砖讙讬讗讛 讘拽讘诇转 讛转专讜诪讜转 诇转讜专诐 讝讛!'));
            });
    }
    return next(action);
}