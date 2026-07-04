import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import departmentRoutes from "./routes/department.js";
import employeeRoutes from "./routes/employee.js";
import authRoutes from "./routes/auth.js";
import path from 'path';
import { fileURLToPath } from 'url';
import salaryRoutes from "./routes/salary.js";
import vacancyRoutes from "./routes/vacancy.js";
import settingRoutes from "./routes/setting.js";
import dashboardRoutes from "./routes/dashboard.js";
import attendanceRoutes from "./routes/attendance.js";
dotenv.config();

connectDB();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/vacancy", vacancyRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});