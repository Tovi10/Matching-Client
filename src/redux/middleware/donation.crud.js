import axios from "axios";
import { SERVER_URL } from "../../constants"
import { actions } from "../actions";

export const createDonation = store => next => action => {
    if (action.type === 'CREATE_DONATION') {
        axios.post(`${SERVER_URL}/api/donation/createDonation/${action.payload.campaignId}`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: donation.crud.js ~ line 8 ~ result", result);
                store.dispatch(actions.setCampaignFromServer(result.data));
                store.dispatch(actions.setCurrentNotification('התרומה התווספה בהצלחה!'))
            })
            .catch(error => {
                console.log("🚀 ~ file: donation.crud.js ~ line 14 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת התרומה!'))
            })
    }
    return next(action)
}