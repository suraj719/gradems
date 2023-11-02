const express = require("express");
const app = express();

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const employeeRoute = require("./routes/employeeRoute");
const studentRoute = require("./routes/studentRoute");
const resultsRoute = require("./routes/resultsRoute");

app.use("/api/employee/", employeeRoute);
app.use("/api/student/", studentRoute);
app.use("/api/results/", resultsRoute);
const path = require("path");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}!`));
