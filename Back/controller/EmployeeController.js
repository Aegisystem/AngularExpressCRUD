import pool from "../db/db.js";

export default class EmployeeController {
    async getEmployees(req, res) {
        try {
            const allEmployees = await pool.query("SELECT * FROM employees");
            res.json(allEmployees.rows);
        } catch (error) {
            console.error(error.message);
        }
    }

    getEmployeeById = async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
            res.json(employee.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    }

    createEmployee = async (req, res) => {
        try {
            const { name, email, phone, address } = req.body;
            const newEmployee = await pool.query(
                "INSERT INTO employees (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *",
                [name, email, phone, address]
            );
            res.json(newEmployee.rows[0]);
        } catch (error) {
            console.error(error.message);
        }
    }

    updateEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, phone, address } = req.body;
            const updateEmployee = await pool.query(
                "UPDATE employees SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5",
                [name, email, phone, address, id]
            );
            res.json("Employee was updated");
        } catch (error) {
            console.error(error.message);
        }
    }

    deleteEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const deleteEmployee = await pool.query("DELETE FROM employees WHERE id = $1", [id]);
            res.json("Employee was deleted");
        } catch (error) {
            console.error(error.message);
        }
    }  
}
