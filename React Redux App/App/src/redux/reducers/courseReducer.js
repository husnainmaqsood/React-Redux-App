import * as types from "../actions/actionTypes";
import initialState from "./initialState";
// in the state argument we have to decide that how we want to initialize our state, using default argument syntax, we are using empty array
export default function courseReducer(state = initialState.courses, action) {
  // course is within the action
  // there are alternative approaches to switch statements, we can use, but most commonly it is used, we can use if statements, lookup tables etc
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      // state.push(action.course); // don't do this, because this mutates the state, and state is immutable
      return [...state, { ...action.course }]; // here we are storing course as it is, but for large datasets, we'll use course ids
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);

    default:
      return state;
  }
}
