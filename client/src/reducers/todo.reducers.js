import ACTIONS from "../constants";

const initialState = {
    loading: false,
    error: null,
    todos: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TODO_REQUEST:
            return { ...state, loading: true };
        case ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [...state.todos, action.payload]
            };
        case ACTIONS.ADD_TODO_FAIL:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};
