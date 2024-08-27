import * as t from "../types";

/* Purpose: This action is used to control the visibility of the modal. It toggles the modal's open state.
* Payload: A boolean (isModalOpen) that determines whether the modal should be open or closed.
*  Usage: This is likely used in the Modal.js component to open or close the modal when certain actions are performed, like clicking the "Add Employee" button or closing the modal after form submission.
*/
export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

/**
 * Purpose: This action triggers the fetching of employee data from the API.
 * Usage: In Table.js, when the component mounts, fetchEmployees() is dispatched to retrieve the list of employees from the API.
 */
export const fetchEmployees = () => {
	return {
		type: t.EMPLOYEE_FETCH_REQUESTED,
	};
};

/**
 * Purpose: This action is dispatched to add a new employee.
 * Payload: The employee object containing the details of the employee to be added.
 * Usage: In Modal.js, when the form is submitted and no employee is selected (i.e., you're adding a new employee), addEmployee(employee) is dispatched to make a POST request to the API.
 */

export const addEmployee = (employee) => {
	return {
		type: t.EMPLOYEE_ADD_REQUESTED,
		payload: employee,
	};
};

/**
 * Purpose: This action is dispatched to update an existing employee.
 * Payload: The employee object containing the updated details, including the _id of the employee to be updated.
 * Usage: In Modal.js, when the form is submitted and an employee is selected (i.e., you're editing an employee), updateEmployee(employee) is dispatched to make a PUT request to the API.
 */
export const updateEmployee = (employee) => {
	return {
		type: t.EMPLOYEE_UPDATE_REQUESTED,
		payload: employee,
	};
};
/**
 * Purpose: This action is dispatched to delete an employee.
 * Payload: The id of the employee to be deleted.
 * Usage: In Table.js, when the delete button is clicked, deleteEmployee(id) is dispatched to make a DELETE request to the API.
 */
export const deleteEmployee = (id) => {
	return {
		type: t.EMPLOYEE_DELETE_REQUESTED,
		payload: id,
	};
};
/**
 * Purpose: This action is used to select an employee for editing.
 * Payload: The id of the employee to be selected.
 * Usage: In Table.js, when the edit button is clicked, setSelectedEmployee(id) is dispatched to set the selected employee in the Redux store. 
 * This is then used in Modal.js to populate the form with the selected employee's data.
 */
export const setSelectedEmployee = (id) => {
	return {
		type: t.EMPLOYEE_SELECTED,
		payload: id,
	};
};

/**
 * How the Actions Work Together
Fetching Employees:

The Table.js component dispatches fetchEmployees(), which triggers a saga (or thunk, depending on your setup) to make a GET request to the API, fetch the employees, and update the Redux store.
Adding or Updating an Employee:

When the form in Modal.js is submitted, either addEmployee(employee) or updateEmployee(employee) is dispatched based on whether an employee is being added or updated. These actions will trigger a saga (or thunk) to make the appropriate POST or PUT request to the API.
Deleting an Employee:

When the delete button is clicked in Table.js, deleteEmployee(id) is dispatched, triggering a saga (or thunk) to make a DELETE request to the API and remove the employee from the database and the Redux store.
Managing the Modal State:

setModalOpen(isModalOpen) is used to control the modal's visibility, and setSelectedEmployee(id) is used to determine which employee is being edited.
Integration with Redux Saga (or Thunk)
In a typical setup with Redux Saga (or Thunk), these action creators would be handled by corresponding sagas or thunks that perform the actual API calls. For example:

When fetchEmployees() is dispatched, a saga (or thunk) listens for EMPLOYEE_FETCH_REQUESTED and makes a GET request to /api/employees.
Similarly, EMPLOYEE_ADD_REQUESTED, EMPLOYEE_UPDATE_REQUESTED, and EMPLOYEE_DELETE_REQUESTED would be listened to by sagas or thunks that perform the necessary API requests.
 */