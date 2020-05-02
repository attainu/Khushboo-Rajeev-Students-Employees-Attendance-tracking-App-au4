//root reducer file while all the reducers will be made available
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import attendanceReducer from "./attendanceReducer";
import allUsersReducer from "./allUsersReducer";
import attendanceTimeReducer from "./attendanceTimeReducer";
import currentUserReducer from "./currentUserReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  attendance: attendanceReducer,
  leaderboardsattendance: allUsersReducer,
  homepageattendance: attendanceTimeReducer,
  currentuser: currentUserReducer
});
