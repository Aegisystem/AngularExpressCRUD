import express from "express";
import bodyParser from "body-parser";
import EmployeeController from "./controller/EmployeeController.js";
import morgan from "morgan";
import cors from "cors";


const app = express();

app.use(morgan());
app.use(cors());

const controller = new EmployeeController();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Bienvenido a mi API");
});

app.get("/employees", controller.getEmployees);
app.get("/employees/:id", controller.getEmployeeById);
app.post("/employees", controller.createEmployee);
app.put("/employees/:id", controller.updateEmployee);
app.delete("/employees/:id", controller.deleteEmployee);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


