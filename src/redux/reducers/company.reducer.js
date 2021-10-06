import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    allCompanies: null,
    company: null,
}

const companyReducer = {
    setAllCompanies(state, action) {
        state.allCompanies = action.payload;
    },
    setCompany(state, action) {
        state.company = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, companyReducer), initialState);