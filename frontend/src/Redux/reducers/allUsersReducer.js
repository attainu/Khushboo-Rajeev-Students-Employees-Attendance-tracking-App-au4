import isEmpty from "../../validation/is-empty";
import { GET_USERS } from "../../actions/types";

const initialState = {
    isAuthenticated: false,
    allUsers: [],
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                allUsers: action.payload,
            };
        default:
            return state;
    }
}
