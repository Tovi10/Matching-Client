import axios from 'axios';

import { SERVER_URL } from "../../constants";
import { actions } from '../actions';

export const createCard = store => next => action => {
    if (action.type === 'CREATE_CARD') {
        axios.post(`${SERVER_URL}/api/card/createCard/${action.payload.campaignId}`, action.payload.card)
            .then(result => {
                console.log("🚀 ~ file: card.crud.js ~ line 9 ~ result", result)
                store.dispatch(actions.setCurrentNotification('הכרטיס התווסף בהצלחה!'))
            })
            .catch(error => {
                console.log("🚀 ~ file: card.crud.js ~ line 12 ~ error", error)
                store.dispatch(actions.setCurrentNotification('ארעה שגיאה ביצירת הכרטיס!'))

            })
    }
    return next(action)
}