import { GET_MESSAGES } from "./types";


const initialState = [];
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return [
                ...state,
                ...action.payload,
            ];
        default:
            return state
    }
};

export default reducer;
