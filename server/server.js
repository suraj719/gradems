const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
const { transporter, mailOptions } = require("./nodemailer");

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const employeeRoute = require("./routes/employeeRoute");
const studentRoute = require("./routes/studentRoute");
const resultsRoute = require("./routes/resultsRoute");

app.use("/api/employee/", employeeRoute);
app.use("/api/student/", studentRoute);
app.use("/api/results/", resultsRoute);
app.post("/getcode", async (req, res) => {
    try {
        // console.log(req.email);
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
      let vcode = "";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        vcode += characters[randomIndex];
      }
      await transporter.sendMail({
        from: "gitty691@gmail.com",
        to: `${req.body.email}`,
        subject: "KL account creation",
        text: `You are trying to Create an employee account, please use the code ${vcode} to create your account `,
      });
      res.status(200).json({ verify: vcode });
    } catch (error) {
      res.status(500).json({ err: error });
    }
  });
const path = require("path");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}!`));
