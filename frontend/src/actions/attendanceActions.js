import axios from "axios";
import { GET_ATTENDANCE, GET_ERRORS, GET_USERS, GET_ATTENDANCE_RESPONSE } from "./types";


// Posting attendance
export const postAttendance = (attendanceData) => (dispatch) => {
  axios
    .post("/api/attendance/", attendanceData)
    .then((res) => {

    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Getting Attendance Time
export const getAttendanceTime = () => (dispatch) => {
  axios
    .get("/api/attendance/")
    .then((res) => {

      dispatch({
        type: GET_ATTENDANCE_RESPONSE,
        payload: res.data
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Getting attendance
export const getAttendance = () => (dispatch) => {
  axios
    .get("/api/attendance/report")
    .then((res) => {

      dispatch({
        type: GET_ATTENDANCE,
        payload: res.data
      })

    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Getting leaderboards
export const getAllUsersAttendance = () => (dispatch) => {

  axios
    .get("/api/attendance/leaderboards")
    .then((res) => {

      dispatch({
        type: GET_USERS,
        payload: res.data
      })

    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

