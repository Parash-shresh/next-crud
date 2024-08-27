/**The Table.js component is designed to display a table of employees, allowing for editing and deleting actions. It integrates with Redux to manage and interact with the application's state. */

import { useSelector, useDispatch } from "react-redux"; 
//useSelector: A React Redux hook to access the Redux store state.
//useDispatch: A React Redux hook to dispatch actions to the Redux store.
//PencilSVG and TrashSVG: SVG components for edit and delete icons.

import { PencilSVG, TrashSVG } from "@/icons";

//Actions: Functions for interacting with the Redux store (deleteEmployee, fetchEmployees, setModalOpen, setSelectedEmployee).
import {
	deleteEmployee,
	fetchEmployees,
	setModalOpen,
	setSelectedEmployee,
} from "@/store";


import { useEffect } from "react"; //useEffect: React hook used to perform side effects like fetching data when the component mounts.

export function Table() {
	const state = useSelector((state) => state.employee); // state variable Accesses the employee state from the Redux store.

	const dispatch = useDispatch(); //Initializes the dispatch function for sending actions to the Redux store.


	//This useEffect hook Fetches the list of employees when the component mounts by dispatching the fetchEmployees action. The empty dependency array ([dispatch]) ensures it runs only once after the initial render.
	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>Full name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{/* Maps over state.employeeList to render rows for each employee. */}
				{state.employeeList.map(({ _id, name, email, address, phone }) => (
					<tr key={_id}>
						<td>{name}</td>
						<td>{email}</td>
						<td>{address}</td>
						<td>{phone}</td>
						<td>
							{/* <button className="btn btn__compact btn__edit": Dispatches setSelectedEmployee and setModalOpen actions to set the selected employee and open the modal for editing. */}
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedEmployee(_id));
									dispatch(setModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>

							{/* <button className="btn btn__compact btn__delete": Dispatches the deleteEmployee action to remove an employee. */}
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteEmployee(_id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}


/**
 * Summary
Table.js displays employee data in a table format.
Redux Integration: Uses useSelector to get the employee list and useDispatch to dispatch actions.
Data Fetching: Uses useEffect to fetch employee data when the component mounts.
Actions: Allows editing and deleting employees through buttons that dispatch appropriate actions.
 */