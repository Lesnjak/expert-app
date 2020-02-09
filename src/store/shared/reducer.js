import {SET_CURRENT_MENU} from "./types";
import {MENU_LIST} from '../../constants/constants';

const initialState = {
    currentMenu: MENU_LIST.common.sessions.id,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_MENU:
            return {
                ...state,
                currentMenu: action.payload.currentMenu,
            };
        default:
            return state
    }
};

export default reducer;