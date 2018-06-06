import ACTIONS from "../constants";
import axios from "axios";
import setAuthHeader from "../utils/setAuthHeader";

const register_request = () => ({ type: ACTIONS.USER_REGISTER_REQUEST });
const register_success = () => ({ type: ACTIONS.USER_REGISTER_SUCCESS });
const register_fail = error => ({ type: ACTIONS.USER_REGISTER_FAIL, payload: error });

const login_request = () => ({ type: ACTIONS.USER_LOGIN_REQUEST });
export const login_success = username => ({ type: ACTIONS.USER_LOGIN_SUCCESS, payload: username });
export const login_fail = error => ({ type: ACTIONS.USER_LOGIN_FAIL, payload: error });

const logout_action = () => ({ type: ACTIONS.USER_LOGOUT });

export const register = (data, history) => dispatch => {
    dispatch(register_request());
    axios.post("http://localhost:3005/api/register", data).then(response => {
        const { data } = response;
        if (data.success) {
            dispatch(register_success());
            history.push("/login");
        } else {
            dispatch(register_fail(data.error));
        }
    });
};

export const login = (data, history) => dispatch => {
    dispatch(login_request());
    axios.post("http://localhost:3005/api/login", data).then(response => {
        const { data } = response;
        if (data.success) {
            const { token, username } = data;
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            setAuthHeader(token);
            dispatch(login_success(username));
            history.push("/");
        } else {
            dispatch(login_fail(data.error));
        }
    });
};

export const logout = () => dispatch => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuthHeader(false);
    dispatch(logout_action());
};
