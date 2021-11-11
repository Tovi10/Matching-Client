import axios from "axios";
import { SERVER_URL } from "../../constants";
import { actions } from "../actions"

export const getUserByUid = store => next => action => {
    if (action.type === 'GET_USER_BY_UID') {
        axios.get(`${SERVER_URL}/api/user/getUserByUid/${action.payload}`)
            .then(result => {
                console.log("🚀 ~ file: user.crud.js ~ line 8 ~ result", result);
                store.dispatch(actions.setUser(result.data));
                if (!result.data)
                    store.dispatch(actions.setCurrentNotification('משתמש לא קיים!'))

            })
            .catch(error => {
                console.log("🚀 ~ file: user.crud.js ~ line 12 ~ error", error);
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה במציאת המשתמש!'))
            })
    }
    return next(action)
}

export const updateUser = store => next => action => {
    if (action.type === 'UPDATE_USER') {
        axios.put(`${SERVER_URL}/api/user/updateUser`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: user.crud.js ~ line 23 ~ result", result)
                store.dispatch(actions.setUser(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: user.crud.js ~ line 27 ~ error", error)
            })
    }
    return next(action)
}

export const createUser = store => next => action => {
    if (action.type === 'CREATE_USER') {
        axios.post(`${SERVER_URL}/api/user/createUser`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: user.crud.js ~ line 37 ~ result", result)
                store.dispatch(actions.setUser(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: user.crud.js ~ line 41 ~ error", error);
            })
    }
    return next(action)
}