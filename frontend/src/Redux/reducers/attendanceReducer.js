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
        //to be filled
      };
    default:
      return state;
  }
}
