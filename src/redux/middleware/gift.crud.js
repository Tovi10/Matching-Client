import axios from 'axios';

import { SERVER_URL } from "../../constants";
import { actions } from '../actions';
import { firebase } from '../../services/firebase.service';


export const createGift = store => next => action => {
    if (action.type === 'CREATE_GIFT') {
        axios.post(`${SERVER_URL}/api/gift/createGift`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: gift.crud.js ~ line 10 ~ result", result);
                store.dispatch(actions.setGift(result.data.ansGift));
                store.dispatch(actions.setGiftId(result.data.ansGift._id));
                store.dispatch(actions.setAllGifts(result.data.allGifts))
            })
            .catch(error => {
                console.log("🚀 ~ file: gift.crud.js ~ line 13 ~ error", error);
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת המתנה!'))

            })
    }
    return next(action)
}

export const updateGift = store => next => action => {
    if (action.type === 'UPDATE_GIFT') {
        axios.put(`${SERVER_URL}/api/gift/updateGift`, action.payload)
            .then(result => {
                if (action.payload.create) {
                    store.dispatch(actions.setCurrentNotification('המתנה התווספה בהצלחה!'));
                }
                else {
                    store.dispatch(actions.setCurrentNotification('המתנה התעדכנה בהצלחה!'));
                }
                console.log("🚀 ~ file: gift.crud.js ~ line 24 ~ result", result)
                store.dispatch(actions.setAllGifts(result.data.allGifts))
            })
            .catch(error => {
                console.log("🚀 ~ file: gift.crud.js ~ line 27 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה בעדכון המתנה!'))
            });
    }
    return next(action);
}

export const getGiftById = store => next => action => {
    if (action.type === 'GET_GIFT_BY_ID') {
        axios.get(`${SERVER_URL}/api/gift/getGiftById/${action.payload._id}`)
            .then((result) => {
                console.log("🚀 ~ file: gift.crud.js ~ line 23 ~ .then ~ result", result)
                store.dispatch(actions.setCurrentGift(result.data));
            })
            .catch((error) => {
                console.log("🚀 ~ file: gift.crud.js ~ line 27 ~ error", error)
            });
    }
    return next(action);
}

export const getAllGifts = store => next => action => {
    if (action.type === 'GET_ALL_GIFTS') {
        axios.get(`${SERVER_URL}/api/gift/getAllGifts`)
            .then(result => {
                console.log("🚀 ~ file: gift.crud.js ~ line 22 ~ result", result)
                store.dispatch(actions.setAllGifts(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: gift.crud.js ~ line 26 ~ error", error)
            })
    }
    return next(action)
}

export const deleteGift = store => next => action => {
    if (action.type === 'DELETE_GIFT') {
         
        axios.delete(`${SERVER_URL}/api/gift/deleteGift/${action.payload._id}`)
            .then(result => {
                 
                console.log("🚀 ~ file: gift.crud.js ~ line 77 ~ result", result)
                store.dispatch(actions.setAllGifts(result.data))
                if (action.payload.image) {
                    const fileRef = firebase.storage().refFromURL(action.payload.image);
                    fileRef.delete().then(function () {
                        console.log("File Deleted")
                    }).catch(function (error) {
                        console.log("🚀 ~ file: gift.crud.js ~ line 85 ~ error", error)
                    });
                    store.dispatch(actions.setCurrentNotification('המתנה נמחקה בהצלחה!'));
                }
            })
            .catch(error => {
                console.log("🚀 ~ file: gift.crud.js ~ line 81 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה במחיקת המתנה!'))
            })
    }
    return next(action)
}