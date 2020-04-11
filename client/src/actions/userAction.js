import { FETCH_USER } from "./types";
import { GET_ERRORS } from "./types";
import axios from "axios";

export const fetchUser = () => (dispatch) => {
  // console.log("payload");
  axios
    .get(`/api/userdetails/home`)
    .then((res) =>
      dispatch({
        type: FETCH_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
