import { FETCH_USER } from "../../actions/types";

const initialState = {
  user: [],
};

export default function (state = initialState, action) {
  // console.log("state", state);
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
