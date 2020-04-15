import axios from "axios";
import { GET_ERRORS } from "./types";

// POSTING ATTENDANCE
export const postAttendance = (attendanceData) => (dispatch) => {
  axios
    .post("/api/attendance/", attendanceData)
    .then((res) =>
      console.log("You have marked your attendance succesfully", res.data)
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// GETTING ATTENDANCE
export const getAttendance = () => (dispatch) => {
  axios
    .get("/api/attendance/")
    .then((res) => console.log("Your attendance data", res.data))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
