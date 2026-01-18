import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import connectToDatabase from "./db/db.js";
import dotenv from "dotenv";
import leaveRouter from "./routes/leave.js"
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js"

dotenv.config();

const app = express();

// Middlewares MUST come first
app.use(cors({origin: "http://localhost:5173", // your frontend origin
  credentials: true    }));
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

// Database
connectToDatabase();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/department",departmentRouter)
app.use("/api/employee",employeeRouter)
app.use("/api/salary",salaryRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/setting",settingRouter)
app.use("/api/dashboard",dashboardRouter)


app.listen(5000, ()=>{
    console.log("server is running")
})