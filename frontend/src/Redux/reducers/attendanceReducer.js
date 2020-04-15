// import isEmpty from "../../validation/is-empty";

import { GET_ATTENDANCE } from "../../actions/types";

const initialState = {
  isAuthenticated: false,
  attendance: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ATTENDANCE:
      return {
        ...state,
        attendance: action.payload,
      };
    default:
      return state;
  }
}
