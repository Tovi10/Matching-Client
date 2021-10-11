import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
 user:null,
 firebaseUser:null,
}

const userReducer = {
    setUser(state, action) {
        state.user = action.payload;
    },
    setFirebaseUser(state,action){
        state.firebaseUser=action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, userReducer), initialState);