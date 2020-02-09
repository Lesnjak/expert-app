import {SET_CURRENT_MENU} from "./types";

export const addCurrentMenu = (payload) => {
    return {
        type: SET_CURRENT_MENU,
        payload
    }
};