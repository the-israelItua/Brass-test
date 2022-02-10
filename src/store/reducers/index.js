import { combineReducers } from "redux";
import paymentsReducer from "./payments";

export default combineReducers({
  payments: paymentsReducer,
});
