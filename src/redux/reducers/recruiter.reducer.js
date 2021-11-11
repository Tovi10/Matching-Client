import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    recruiterLink: '',
    recruiterDonations: [],
    currentRecruiter: null,
}

const recruiterReducer = {
    setRecruiterLink(state, action) {
        state.recruiterLink = action.payload;
    },
    setRecruiterDonations(state, action) {
        state.recruiterDonations = action.payload;
    },
    setCurrentRecruiter(state, action) {
        state.currentRecruiter = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, recruiterReducer), initialState);