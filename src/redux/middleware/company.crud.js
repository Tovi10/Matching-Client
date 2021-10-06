import axios from 'axios';

import { actions } from "../actions";
import { SERVER_URL } from "../../constants";

export const getCompanyById = store => next => action => {
    if (action.type === 'GET_COMPANY_BY_ID') {
        axios.get(`${SERVER_URL}/api/company/getCompanyById/${action.payload}`)
            .then(result => {
                console.log("🚀 ~ file: company.crud.js ~ line 10 ~ result", result)
                store.dispatch(actions.setCompany(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: company.crud.js ~ line 14 ~ error", error)
            })
    }
    return next(action)
}

export const getAllCompanies = store => next => action => {
    if (action.type === 'GET_ALL_COMPANIES') {
        axios.get(`${SERVER_URL}/api/company/getAllCompanies`)
            .then(result => {
                console.log("🚀 ~ file: company.crud.js ~ line 24 ~ result", result)
                store.dispatch(actions.setAllCompanies(result.data));
            })
            .catch(error => {
                console.log("🚀 ~ file: company.crud.js ~ line 28 ~ error", error)
            })
    }
    return next(action)
}

export const createCompany = store => next => action => {
    if (action.type === 'CREATE_COMPANY') {
        axios.post(`${SERVER_URL}/api/company/createCompany`, action.payload)
            .then(result => {
                console.log("🚀 ~ file: company.crud.js ~ line 38 ~ result", result)
                store.dispatch(actions.setAllCompanies(result.data));
                if(!result.data[result.data.length-1].logo){
                    store.dispatch(actions.setCurrentNotification(`החברה נוצרה בהצלחה!`))
                }
                // [result.data.length-1] the newest company;
                store.dispatch(actions.setCompany(result.data[result.data.length-1]));
                store.dispatch(actions.setCompanyId(result.data[result.data.length-1]._id));
            })
            .catch(error => {
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת החברה!'))
                console.log("🚀 ~ file: company.crud.js ~ line 42 ~ error", error)
            });
    }
    return next(action);
}

export const updateCompany = store => next => action => {
    if (action.type === 'UPDATE_COMPANY') {
        axios.put(`${SERVER_URL}/api/company/updateCompany`, action.payload)
            .then(result => {
                store.dispatch(actions.setCurrentNotification(`החברה נוצרה בהצלחה!`))
                console.log("🚀 ~ file: company.crud.js ~ line 53 ~ result", result);
            })
            .catch(error => {
                // store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת החברה!'))
                console.log("🚀 ~ file: company.crud.js ~ line 56 ~ error", error)
            });
    }
    return next(action);
}