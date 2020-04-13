import { FETCH_USER } from "./types";
import { GET_ERRORS } from "./types";
import axios from "axios";

export const fetchUser = () => (dispatch) => {
  axios
    .get(`/api/users/login`)
    .then((res) =>
      dispatch(
        {
          type: FETCH_USER,
          payload: res.data,
        },
        console.log("users", res.data)
      )
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
