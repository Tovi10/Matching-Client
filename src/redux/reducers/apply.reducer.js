import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    applies: null,
    showModal: false,
}

const applyReducer = {
    setApplies(state, action) {
        state.applies = action.payload;
    },
    setShowModal(state, action) {
        state.showModal = action.payload;
    },

}
export default produce((state, action) => createReducer(state, action, applyReducer), initialState);