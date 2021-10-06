import produce from 'immer'
import createReducer from "./reducerUtils";

const initialState = {
    allGifts: null,
    currentGift: null,
    gift:null,
}

const giftReducer = {
    setAllGifts(state, action) {
        state.allGifts = action.payload;
    },
    setCurrentGift(state, action) {
        state.currentGift = action.payload;
    },
    setGift(state, action) {
        state.gift = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, giftReducer), initialState);