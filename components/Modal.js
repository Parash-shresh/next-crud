/**
 * The Modal.js component handles displaying a modal dialog for adding or editing employee information. 
 * It integrates with React Redux for state management and React Hook Form for form handling.
 */
import { useEffect } from "react";
import ReactDOM from "react-dom"; //ReactDOM: Provides createPortal for rendering the modal outside the main DOM hierarchy.

import { useDispatch, useSelector } from "react-redux"; //Hooks from React Redux for state management.
import { useForm } from "react-hook-form"; //useForm: Hook from React Hook Form for form handling.

import cx from "clsx"; //cx: Utility for conditionally applying CSS classes.


import { CheckSVG, CloseSVG } from "@/icons";
import {
	addEmployee,
	setModalOpen,
	setSelectedEmployee,
	updateEmployee,
} from "@/store";

export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.employee); //const state = useSelector((state) => state.employee);: Retrieves the employee state from Redux.

	const dispatch = useDispatch(); //Provides the dispatch function for sending actions to Redux.

	//Resets the form, closes the modal, and clears the selected employee.
	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedEmployee(undefined));
	};

	//Dispatches updateEmployee or addEmployee actions based on whether an employee is selected.
	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedEmployee) {
			dispatch(
				updateEmployee({
					_id: state.selectedEmployee._id,
					...data,
				})
			);
		} else {
			dispatch(addEmployee(data));
		}
	};

	//useEffect Updates form values when state.selectedEmployee changes.
	useEffect(() => {
		if (state.selectedEmployee) {
			setValue("name", state.selectedEmployee.name);
			setValue("email", state.selectedEmployee.email);
			setValue("address", state.selectedEmployee.address);
			setValue("phone", state.selectedEmployee.phone);
		}
	}, [state.selectedEmployee, setValue]);

	return state.isModalOpen
		? ReactDOM.createPortal(
			// ReactDOM.createPortal: Renders the modal into document.body to ensure it appears on top of other content.
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.selectedEmployee ? (
									<>
										Edit <span>Employee</span>
									</>
								) : (
									<>
										Add <span>Employee</span>
									</>
								)}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<label
									htmlFor="nameInput"
									className={cx("label", errors.name && "label--error")}
								>
									{errors.name ? (
										"Full name is required!"
									) : (
										<>
											Full name&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="name"
									placeholder="Full name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="emailInput"
									className={cx("label", errors.email && "label--error")}
								>
									{errors.email ? (
										`${errors.email.message}`
									) : (
										<>
											Email&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="email"
									id="emailInput"
									name="email"
									placeholder="Email"
									className={cx("input", errors.email && "input--error")}
									ref={register({
										required: "Email is required!",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: "Invalid email address!",
										},
									})}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="addressArea"
									className={cx("label", errors.address && "label--error")}
								>
									{errors.address ? (
										"Address is required!"
									) : (
										<>
											Address&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<textarea
									type="text"
									id="addressArea"
									name="address"
									placeholder="Address"
									className={cx("area", errors.address && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="phoneNumber"
									className={cx("label", errors.phone && "label--error")}
								>
									{errors.phone ? (
										`${errors.phone.message}`
									) : (
										<>
											Phone&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="number"
									id="phoneNumber"
									name="phone"
									placeholder="Phone"
									className={cx("input", errors.phone && "input--error")}
									ref={register({
										required: "Phone is required!",
										minLength: {
											value: 11,
											message: "Minimum of 11 digits",
										},
										maxLength: {
											value: 12,
											message: "Maximum of 12 digits",
										},
									})}
								/>
							</div>

							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedEmployee ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}


/**
 * Summary
* Modal.js manages displaying and handling the modal for employee addition or editing.
* Form Handling: Uses React Hook Form for form state and validation.
* Redux Integration: Manages modal state and employee data through Redux.
* Rendering: Uses ReactDOM.createPortal to render the modal outside the main DOM hierarchy.
 */