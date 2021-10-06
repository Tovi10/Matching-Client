import { actions } from "../actions"

export const setCurrentNotification = store => next => action => {
    if (action.type === 'SET_CURRENT_NOTIFICATION') {
        store.dispatch(actions.zeroCurrentNotification());
    }
    return next(action)
}