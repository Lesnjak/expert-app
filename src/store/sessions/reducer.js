import { GET_SESSIONS } from "./types";


const initialState = {real:[],pending:[],daily:[]};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SESSIONS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};

export default reducer;
