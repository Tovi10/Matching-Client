import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    applies: null,
}

const applyReducer = {
    setApplies(state, action) {
        state.applies = action.payload;
    },
  
}
export default produce((state, action) => createReducer(state, action, applyReducer), initialState);