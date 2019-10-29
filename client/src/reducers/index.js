import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import salsaReducer from "./salsaReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  videos: streamReducer,
  salsa: salsaReducer
});
