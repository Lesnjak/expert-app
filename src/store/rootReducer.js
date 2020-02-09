import {combineReducers} from "redux";
import registration from './registration'
import categories from './categories'
import shared from './shared'
import sessions from './sessions'
import chat from './chat'

export const rootReducer = combineReducers({
    registration: registration.reducer,
    categories: categories.reducer,
    shared: shared.reducer,
    sessions:sessions.reducer,
    chat:chat.reducer
});
