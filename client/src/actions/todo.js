import ACTIONS from "../constants";
import axiosAuth from "../utils/axiosAuth";
import setAuthHeader from "../utils/setAuthHeader";
import { login_fail } from "../actions/auth";

const add_todo_request = () => {
    return {
        type: ACTIONS.ADD_TODO_REQUEST
    };
};
const add_todo_success = todo => {
    return {
        type: ACTIONS.ADD_TODO_SUCCESS,
        payload: todo
    };
};
const add_todo_fail = error => {
    return {
        type: ACTIONS.ADD_TODO_FAIL,
        payload: error
    };
};

export const addTodo = todo => dispatch => {
    dispatch(add_todo_request());
    setAuthHeader(localStorage.getItem("token"));
    axiosAuth
        .post("/api/todos", { name: todo })
        .then(response => {
            const { data } = response;
            if (data.success) {
                dispatch(add_todo_success(data.todo));
            } else {
                dispatch(add_todo_fail(data.message));
            }
        })
        .catch(e => {
            dispatch(login_fail(e.response.data.message));
        });
};
