import produce from 'immer'
import createReducer from "./reducerUtils";
import io from "socket.io-client";

const initialState = {
    socket: io.connect('http://localhost:4000/', {
        transports: ['websocket']
    }),
    // socket: io.connect('https://matching-try.herokuapp.com/', {
    //     transports: ['polling']
    // }),
}

const socketReducer = {
    setSocket(state, action) {
        state.socket = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, socketReducer), initialState);