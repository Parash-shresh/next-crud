/**
 * A typical example of an API route handler in Next.js that interacts with a MongoDB database using Mongoose
 */
import Employee from "@/models/Employee"; //Employee: This is a Mongoose model for the Employee schema, which defines the structure of the employee data and provides methods to interact with the employees collection in the MongoDB database.

import "@/utils/dbConnect"; //dbConnect: This utility file is used to establish a connection to the MongoDB database.

//The default export is an asynchronous function that handles HTTP requests.
export default async (req, res) => {
	const { method } = req;

	// Handling Different HTTP Methods:
	switch (method) {
		/* 
		GET: Retrieves a list of employees.
		Employee.find({}): Finds all employee documents in the database.
		.sort({ createdAt: "desc" }): Sorts the employees by the createdAt field in descending order.
		Responds with status 200 and the list of employees if successful, or status 400 if there’s an error.
		*/
		case "GET":
			try {
				const employees = await Employee.find({}).sort({
					createdAt: "desc",
				});

				return res.status(200).json({
					success: true,
					data: employees,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}

			/**
			 * Employee.create(req.body): Creates a new employee document using the data from the request body.
			 * Responds with status 201 and the created employee if successful, or status 400 if there’s an error.
			 */
		case "POST":
			try {
				const employees = await Employee.create(req.body);
				return res.status(201).json({
					success: true,
					data: employees,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}

			/**
			 * Handles methods that are not GET or POST.
			 * Sets the allowed methods in the response header and responds with status 405 (Method Not Allowed) if the method is not supported.
			 */
		default:
			res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};


/**
 * Error Handling: Both GET and POST requests include error handling to return a status of 400 if something goes wrong.
 * Response Structure: Success responses include a success flag and the data, while error responses just include the success flag.
 * Method Restriction: The default case ensures that only GET and POST requests are allowed. If another method is used, a 405 status is returned.
 */


/**
 * Usage :
 * Frontend Interaction: Your frontend components (like the Table and Modal components) will send HTTP requests to this API endpoint to fetch or modify employee data.
 * Database Operations: The Employee model is used to interact with the MongoDB database, performing CRUD operations as defined.
 */