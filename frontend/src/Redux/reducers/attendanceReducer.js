import isEmpty from "../../validation/is-empty";

import { GET_ATTENDANCE } from "../../actions/types";

const initialState = {
  isAuthenticated: false,
  userAttendance: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ATTENDANCE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userAttendance: action.payload,
      };
    default:
      return state;
  }
}
