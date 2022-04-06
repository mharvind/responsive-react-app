import { combineReducers } from "redux";
import updateReducer from "./updateReducer";
import updateStateReducer from "./updateFullStateReducer";

const allReducers = combineReducers({
  update: updateReducer,
  updateState: updateStateReducer,
});

export default allReducers;
