import {ADD_CATEGORIES} from "./types";

export const addCategories = (payload) => {
    return {
        type: ADD_CATEGORIES,
        payload
    }
};
