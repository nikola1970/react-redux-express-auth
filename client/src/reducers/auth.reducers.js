import ACTIONS from "../constants";

const initialState = {
    username: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.USER_REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
        case ACTIONS.USER_REGISTER_SUCCESS:
            return { ...state, loading: false };
        case ACTIONS.USER_REGISTER_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ACTIONS.USER_LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case ACTIONS.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                username: action.payload,
                isAuthenticated: true,
                error: null
            };
        case ACTIONS.USER_LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ACTIONS.USER_LOGOUT:
            return { ...state, username: null, isAuthenticated: false };
        default:
            return state;
    }
};
