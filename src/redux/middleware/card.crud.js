import axios from 'axios';

import { SERVER_URL } from "../../constants";
import { actions } from '../actions';

export const createCard = store => next => action => {
    if (action.type === 'CREATE_CARD') {
        axios.post(`${SERVER_URL}/api/card/createCard/${action.payload.campaignId}/${store.getState().userReducer.user.uid}`, action.payload.card)
            .then(result => {
                console.log("🚀 ~ file: card.crud.js ~ line 9 ~ result", result)
                store.dispatch(actions.setCurrentNotification('הכרטיס התווסף בהצלחה!'))
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
                store.dispatch(actions.setUser(result.data.user));
            })
            .catch(error => {
                console.log("🚀 ~ file: card.crud.js ~ line 12 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת הכרטיס!'))

            })
    }
    return next(action)
}

export const updateCard = store => next => action => {
    if (action.type === 'UPDATE_CARD') {
        axios.put(`${SERVER_URL}/api/card/updateCard`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: card.crud.js ~ line 26 ~ result", result)
                store.dispatch(actions.setAllCampaigns(result.data.campaigns));
                store.dispatch(actions.setUser(result.data.user));
                store.dispatch(actions.setCurrentNotification('הכרטיס התעדכן בהצלחה!'))
            })
            .catch(error => {
                console.log("🚀 ~ file: card.crud.js ~ line 30 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה בעדכון הכרטיס!'))
            })
    }
    return next(action)
}

export const deleteCard = store => next => action => {
    if (action.type === 'DELETE_CARD') {
        axios.delete(`${SERVER_URL}/api/card/deleteCard/${action.payload._id}/${store.getState().userReducer.user.uid}/${action.payload.gift._id}`)
            .then(result => {
                console.log("🚀 ~ file: card.crud.js ~ line 43 ~ result", result)
                store.dispatch(actions.setAllCampaigns(result.data.campaigns));
                store.dispatch(actions.setUser(result.data.user));
                store.dispatch(actions.setAllGifts(result.data.allGifts));
                store.dispatch(actions.setCurrentNotification('הכרטיס נמחק בהצלחה!'))
            })
            .catch(error => {
                console.log("🚀 ~ file: card.crud.js ~ line 49 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה במחיקת הכרטיס!'))
            })
    }
    return next(action)
}