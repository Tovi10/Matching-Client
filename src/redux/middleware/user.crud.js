import { actions } from "../actions"

export const getUser = store => next => action => {
    if (action.type === 'GET_USER') {
        store.dispatch(actions.setUser())

    }
    return next(action)
}