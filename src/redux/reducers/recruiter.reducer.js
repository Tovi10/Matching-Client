import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    recruiterLink: '',
}

const recruiterReducer = {
    setRecruiterLink(state, action) {
        state.recruiterLink = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, recruiterReducer), initialState);