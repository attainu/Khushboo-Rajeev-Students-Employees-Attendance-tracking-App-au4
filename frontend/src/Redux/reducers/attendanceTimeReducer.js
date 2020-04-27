import isEmpty from "../../validation/is-empty";
import { GET_ATTENDANCE_RESPONSE } from "../../actions/types";

const initialState = {
    isAuthenticated: false,
    userAttendanceResponse: [],
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ATTENDANCE_RESPONSE:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                userAttendanceResponse: action.payload,
            };
        default:
            return state;
    }
}
