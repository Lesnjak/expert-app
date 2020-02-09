import {ADD_CATEGORIES} from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORIES:
            const {categories} = action.payload;

            const nextState = {};

            categories.forEach(category => {
                nextState[category.name] = category.subCategories.map(({id, name}) => ({id, name, checked: false}))
            });

            return nextState;
        default:
            return state
    }
};

export default reducer;
