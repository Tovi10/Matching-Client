import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    user: null,
    firebaseUser: null,
    admin:false,
}

const userReducer = {
    setUser(state, action) {
        state.user = action.payload;
        if (action.payload.email === 'glikel108@gmail.com')
            state.admin = true;
    },
    setFirebaseUser(state, action) {
        state.firebaseUser = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, userReducer), initialState);