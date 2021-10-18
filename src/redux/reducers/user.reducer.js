import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    user: null,
    firebaseUser: null,
    admin: false,
}

const userReducer = {
    setUser(state, action) {
        state.user = action.payload;
        document.cookie = `giftMatchUserUid=${state.user.uid}`;
        if (action.payload.email === 'glikel108@gmail.com') {
            state.admin = true;
        } else {
            state.admin = false;
        }
    },
    setFirebaseUser(state, action) {
        state.firebaseUser = action.payload;
    },
    signOut(state, action) {
        document.cookie = `giftMatchUserUid=`;
        state.user = state.firebaseUser = null;
    },
}
export default produce((state, action) => createReducer(state, action, userReducer), initialState);