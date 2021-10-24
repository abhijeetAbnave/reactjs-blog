import { combineReducers } from "redux";
import auth from "./auth";
import uiStates from "./ui-states";
import user from "./user"

export default combineReducers({
  auth,
  uiStates,
  user
});
