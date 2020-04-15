import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_ATTENDANCE, GET_ATTENDANCE, GET_ERRORS } from "./types";

// Posting attendance
export const postAttendance = (attendanceData) => (dispatch) => {
  axios
    .post("/api/attendance/", attendanceData)
    .then((res) => console.log("success"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
