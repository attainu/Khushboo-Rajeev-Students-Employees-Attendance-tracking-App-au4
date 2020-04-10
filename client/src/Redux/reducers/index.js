//root reducer file while all the reducers will be made available
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import udetailsReducer from "./udetailsReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  udetails: udetailsReducer
});
