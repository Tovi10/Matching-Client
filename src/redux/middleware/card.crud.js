import axios from 'axios';

import { SERVER_URL } from "../../constants";
import { actions } from '../actions';

export const createCard = store => next => action => {
    if (action.type === 'CREATE_CARD') {
        axios.post(`${SERVER_URL}/api/card/createCard/${action.payload.campaignId}/${store.getState().userReducer.user.uid}`, action.payload.card)
            .then(result => {
                console.log("馃殌 ~ file: card.crud.js ~ line 9 ~ result", result)
                store.dispatch(actions.setCurrentNotification('讛讻专讟讬住 讛转讜讜住祝 讘讛爪诇讞讛!'))
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
                store.dispatch(actions.setUser(result.data.user));
            })
            .catch(error => {
                console.log("馃殌 ~ file: card.crud.js ~ line 12 ~ error", error)
                store.dispatch(actions.setCurrentNotification('讗专注讛 砖讙讬讗讛 讘讬爪讬专转 讛讻专讟讬住!'))

            })
    }
    return next(action)
}

export const updateCard = store => next => action => {
    if (action.type === 'UPDATE_CARD') {
        axios.put(`${SERVER_URL}/api/card/updateCard`, action.payload)
            .then(result => {
                console.log("馃殌 ~ file: card.crud.js ~ line 26 ~ result", result)
                store.dispatch(actions.setAllCampaigns(result.data.campaigns));
                store.dispatch(actions.setUser(result.data.user));
                store.dispatch(actions.setCurrentNotification('讛讻专讟讬住 讛转注讚讻谉 讘讛爪诇讞讛!'))
            })
            .catch(error => {
                console.log("馃殌 ~ file: card.crud.js ~ line 30 ~ error", error)
                store.dispatch(actions.setCurrentNotification('讗专注讛 砖讙讬讗讛 讘注讚讻讜谉 讛讻专讟讬住!'))
            })
    }
    return next(action)
}

export const deleteCard = store => next => action => {
    if (action.type === 'DELETE_CARD') {
        debugger
        axios.delete(`${SERVER_URL}/api/card/deleteCard/${action.payload.card._id}/${store.getState().userReducer.user.uid}/${action.payload.card.gift._id}/${action.payload.campaignId}`)
            .then(result => {
                console.log("馃殌 ~ file: card.crud.js ~ line 43 ~ result", result)
                store.dispatch(actions.setAllCampaigns(result.data.campaigns));
                store.dispatch(actions.setUser(result.data.user));
                store.dispatch(actions.setAllGifts(result.data.allGifts));
                store.dispatch(actions.setCurrentNotification('讛讻专讟讬住 谞诪讞拽 讘讛爪诇讞讛!'))
            })
            .catch(error => {
                console.log("馃殌 ~ file: card.crud.js ~ line 49 ~ error", error)
                store.dispatch(actions.setCurrentNotification('讗专注讛 砖讙讬讗讛 讘诪讞讬拽转 讛讻专讟讬住!'))
            })
    }
    return next(action)
}