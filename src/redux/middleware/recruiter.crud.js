import axios from "axios";
import { SERVER_URL } from "../../constants";
import { actions } from "../actions";

export const createRecruiter = store => next => action => {
    if (action.type === 'CREATE_RECRUITER') {
        axios.post(`${SERVER_URL}/api/recruiter/createRecruiter`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 5 ~ result", result);
                store.dispatch(actions.setCurrentNotification('המגייס נוצר בהצלחה!'));
                let link = "http://localhost:3000/recruiters/" + result.data.recruiter._id;
                // let link = "https://matching-try.herokuapp.com/recruiters/" + result.data.recruiter._id;
                store.dispatch(actions.setRecruiterLink(link));
                store.dispatch(actions.updateRecruiterDetails({ id: result.data.recruiter._id, data: { link: link } }));
            })
            .catch(error => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 9 ~ error", error);
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת מגייס!'));
            });
    }
    return next(action);
}

export const updateRecruiterDetails = store => next => action => {
    if (action.type === 'UPDATE_RECRUITER_DETAILS') {
        axios.put(`${SERVER_URL}/api/recruiter/updateRecruiterDetails/${action.payload.id}`, action.payload.data)
            .then(result => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 26 ~ result", result)
            })
            .catch(error => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 29 ~ error", error)
            })
    }
    return next(action);
}