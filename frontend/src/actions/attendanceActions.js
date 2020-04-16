import axios from "axios";
import { GET_ATTENDANCE, GET_ERRORS } from "./types";


// Posting attendance
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

// Getting attendance
export const getAttendance = () => (dispatch) => {

  axios
    .get("/api/attendance/report")
    .then((res) => {
      console.log("Your attendance data", res.data);
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



