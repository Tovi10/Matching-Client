import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
 user:null
}

const userReducer = {
    setUser(state, action) {
        // state.user = action.payload.user;
        alert('set user in userreducer')
    },
}
export default produce((state, action) => createReducer(state, action, userReducer), initialState);