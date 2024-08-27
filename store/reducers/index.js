import { combineReducers } from "redux";
import employeeReducer from "./employee";

const rootReducer = combineReducers({
	employee: employeeReducer,
});

export default rootReducer;

/**
 * What They Do: Reducers are like the decision-makers. They listen to the actions and decide how to update the app's data (called the state).
 * Example: If an action says, "Add this employee," the reducer will update the list of employees by adding the new one.

 */