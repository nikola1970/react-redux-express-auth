import { combineReducers } from "redux";

import authReducer from "./auth.reducers";
import todoReducers from "./todo.reducers";

export default combineReducers({
    auth: authReducer,
    todo: todoReducers
});