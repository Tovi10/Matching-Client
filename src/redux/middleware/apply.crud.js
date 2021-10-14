import axios from 'axios';
import { SERVER_URL } from "../../constants";
import { actions } from '../actions';

export const createApply = store => next => action => {
    if (action.type === 'CREATE_APPLY') {
        axios.post(`${SERVER_URL}/api/apply/CreateApply`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: apply.crud.js ~ line 9 ~ result", result)
                store.dispatch(actions.setCurrentNotification('הבקשה נוצרה בהצלחה!'))
            })
            .catch(error => {
                console.log("🚀 ~ file: apply.crud.js ~ line 13 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת הבקשה!'))
            })
    }
    return next(action)
}

export const getApplies = store => next => action => {
    if (action.type === 'GET_APPLIES') {
        axios.get(`${SERVER_URL}/api/apply/getApplies`)
            .then(result => {
                console.log("🚀 ~ file: apply.crud.js ~ line 24 ~ result", result);
                store.dispatch(actions.setApplies(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: apply.crud.js ~ line 27 ~ error", error)
            })
    }
    return next(action)
}