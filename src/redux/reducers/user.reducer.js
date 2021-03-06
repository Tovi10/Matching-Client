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
        const cookie = document.cookie.split('giftMatchUserUid=');
        if (!(cookie.length === 2 && cookie[1])) {
            let date = new Date();
            date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 365);
            document.cookie = 'giftMatchUserUid='+state.user.uid+'; expires=' + date.toGMTString() + ';';
        }
        if (action.payload.email === 'giftmatching@gmail.com') {
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
        state.admin=false;
    },
}
export default produce((state, action) => createReducer(state, action, userReducer), initialState);