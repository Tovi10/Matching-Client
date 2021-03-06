import { actions } from "../actions"
import { SERVER_URL } from "../../constants";
import axios from 'axios';

export const getAllCampaigns = store => next => action => {
    if (action.type === 'GET_ALL_CAMPAIGNS') {
        axios.get(`${SERVER_URL}/api/campaign/getAllCampaigns`)
            .then(result => {
                console.log("🚀 ~ file: campaign.crud.js ~ line 9 ~ result", result)
                store.dispatch(actions.setAllCampaigns(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: campaign.crud.js ~ line 12 ~ error", error)
            })
    }
    return next(action)
}

export const getCampaignById = store => next => action => {
    if (action.type === 'GET_CAMPAIGN_BY_ID') {
        axios.get(`${SERVER_URL}/api/campaign/getCampaignById/${action.payload}`)
            .then(result => {
                console.log("🚀 ~ file: campaign.crud.js ~ line 23 ~ result", result);
                store.dispatch(actions.setCampaignFromServer(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: campaign.crud.js ~ line 27 ~ error", error);
            })
    }
    return next(action)
}

export const createCampaign = store => next => action => {
    if (action.type === 'CREATE_CAMPAIGN') {
        axios.post(`${SERVER_URL}/api/campaign/createCampaign`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: campaign.crud.js ~ line 27 ~ result.data", result.data);
                if (!result.data.campaign.images.length) {
                    store.dispatch(actions.setCurrentNotification('הקמפיין נוצר בהצלחה!'))
                }
                store.dispatch(actions.setCampaignFromServer(result.data.campaign));
                store.dispatch(actions.setUser(result.data.user));
                store.dispatch(actions.setCampaignId(result.data.campaign._id))
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
            })
            .catch(error => {
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת הקמפיין!'))
                console.log("🚀 ~ file: campaign.crud.js ~ line 24 ~ error", error)
            });
    }
    return next(action);
}

export const updateCampaign = store => next => action => {
    if (action.type === 'UPDATE_CAMPAIGN') {
        const data=action.payload;
        axios.put(`${SERVER_URL}/api/campaign/updateCampaign`, {...data,uid:store.getState().userReducer.user.uid})
            .then(result => {
                if (action.payload.create)
                    store.dispatch(actions.setCurrentNotification('הקמפיין נוצר בהצלחה!'));
                else
                    store.dispatch(actions.setCurrentNotification('הקמפיין התעדכן בהצלחה!'))
                console.log("🚀 ~ file: campaign.crud.js ~ line 39 ~ result", result)
                store.dispatch(actions.setCampaignFromServer(result.data.campaign));
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
                store.dispatch(actions.setUser(result.data.user));

            })
            .catch(error => {
                if (action.payload.create)
                    store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת הקמפיין!'))
                else
                    store.dispatch(actions.setCurrentNotification('ארעה שגיאה בעדכון הקמפיין!'))
                console.log("🚀 ~ file: campaign.crud.js ~ line 42 ~ error", error)
            });
    }
    return next(action);
}

export const deleteCampaign = store => next => action => {
    if (action.type === 'DELETE_CAMPAIGN') {
        axios.delete(`${SERVER_URL}/api/campaign/deleteCampaign/${action.payload.campaignId}/${action.payload.userId}`)
            .then(result => {
                console.log("🚀 ~ file: campaign.crud.js ~ line 80 ~ result", result)
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
                store.dispatch(actions.setUser(result.data.user));
                store.dispatch(actions.setCurrentNotification('הקמפיין נמחק בהצלחה!'))
            })
            .catch(error => {
                console.log("🚀 ~ file: campaign.crud.js ~ line 85 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה במחיקת הקמפיין!'))
            });
    }
    return next(action);
}