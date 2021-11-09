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
                debugger
                store.dispatch(actions.updateRecruiterDetails({ id: result.data.recruiter._id, link, uid: store.getState().userReducer.user.uid }));
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
        axios.put(`${SERVER_URL}/api/recruiter/updateRecruiterDetails/${action.payload.id}`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 26 ~ result", result)
                store.dispatch(actions.setAllCampaigns(result.data.allCampaigns));
                store.dispatch(actions.setUser(result.data.user))
            })
            .catch(error => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 29 ~ error", error)
            })
    }
    return next(action);
}

export const getRecruiterById = store => next => action => {
    if (action.type === 'GET_RECRUITER_BY_ID') {
        axios.get(`${SERVER_URL}/api/recruiter/getRecruiterById/${action.payload.recruiterId}`)
            .then(result => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 41 ~ result", result);
                store.dispatch(actions.setCurrentRecruiter(result.data.recruiter));
            })
            .catch(error => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 44 ~ error", error);
            })
    }
    return next(action);
}

export const updateRecruiter = store => next => action => {
    if (action.type === 'UPDATE_RECRUITER') {
        axios.put(`${SERVER_URL}/api/recruiter/updateRecruiter/${store.getState().userReducer.user.uid}`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 55 ~ result", result)
                store.dispatch(actions.setCurrentNotification('המגייס התעדכן בהצלחה!'))
                store.dispatch(actions.setAllCampaigns(result.data.campaigns));
                store.dispatch(actions.setUser(result.data.user));
            })
            .catch(error => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 58 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה בעדכון המגייס!'))
            })
    }
    return next(action);
}


export const deleteRecruiter = store => next => action => {
    if (action.type === 'DELETE_RECRUITER') {
        axios.delete(`${SERVER_URL}/api/recruiter/deleteRecruiter/${action.payload}/${store.getState().userReducer.user.uid}`)
            .then(result => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 71 ~ result", result)
                store.dispatch(actions.setCurrentNotification('המגייס נמחק בהצלחה!'))
                store.dispatch(actions.setAllCampaigns(result.data.campaigns));
                store.dispatch(actions.setUser(result.data.user));
            })
            .catch(error => {
                console.log("🚀 ~ file: recruiter.crud.js ~ line 75 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה במחיקת המגייס!'))
            })
    }
    return next(action);
}
