import axios from "axios";
import { SERVER_URL } from "../../constants";
import { actions } from "../actions";

export const createRecruiter = store => next => action => {
    if (action.type === 'CREATE_RECRUITER') {
        axios.post(`${SERVER_URL}/api/recruiter/createRecruiter`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 5 ~ result", result)
                store.dispatch(actions.setCurrentNotification('המגייס נוצר בהצלחה!'))
            })
            .catch(error => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 9 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת מגייס!'))
            });
    }
    return next(action);
}