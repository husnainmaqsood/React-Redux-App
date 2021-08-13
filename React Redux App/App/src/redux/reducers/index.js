// this is root reducer
import { combineReducers } from "redux";
import courses from "./courseReducer"; // this courses is basically courseReducer, we have named it courses
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
