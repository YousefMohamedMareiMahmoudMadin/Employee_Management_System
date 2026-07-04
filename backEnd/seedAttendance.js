// seedAttendance.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";
import Employee from "./models/Employee.js";
import Department from "./models/Department.js";
import Attendance from "./models/Attendance.js";
import Vacancy from "./models/Vacancy.js";
import Salary from "./models/Salary.js";

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/attendance");
        console.log("Connected to database for seeding...");

        
        await User.deleteMany({ role: "employee" });
        await Employee.deleteMany({});
        await Department.deleteMany({});
        await Attendance.deleteMany({});
        await Vacancy.deleteMany({});
        await Salary.deleteMany({});

        const deptNames = ["Human Resources", "Finance & Accounting", "Information Technology", "Operations Management", "Sales"];
        const depts = [];
        for (let name of deptNames) {
            const d = await Department.create({ name, description: `${name} operational business unit.` });
            depts.push(d);
        }

        const passwordHash = await bcrypt.hash("Pass123@corporate", 10);
        const dateStr = "2026-07-04";

        
        const empRawData = [
            // HR
            { name: "Ahmed Mansour", email: "ahmed.hr@corporate.com", id: "EMP-HR-001", dob: "1992-04-12", gender: "Male", status: "Married", des: "HR Specialist", base: 6000, deptIdx: 0, att: "Present", sal: { all: 200, ded: 0 } },
            { name: "Sarah Al-Otaibi", email: "sarah.hr@corporate.com", id: "EMP-HR-002", dob: "1995-08-25", gender: "Female", status: "Single", des: "Recruiter", base: 5500, deptIdx: 0, att: "Vacancy", vac: { type: "Casual vacancy", reason: "Medical check-up appointment at the hospital.", status: "Approved" }, sal: { all: 150, ded: 0 } },
            { name: "Tarek Al-Fayed", email: "tarek.hr@corporate.com", id: "EMP-HR-003", dob: "1989-01-15", gender: "Male", status: "Married", des: "HR Coordinator", base: 5800, deptIdx: 0, att: "Present", sal: { all: 200, ded: 50 } },
            // Finance
            { name: "Mohamed Abdel-Rahman", email: "mohamed.fin@corporate.com", id: "EMP-FIN-001", dob: "1990-11-03", gender: "Male", status: "Married", des: "Senior Accountant", base: 8500, deptIdx: 1, att: "Present", sal: { all: 400, ded: 0 } },
            { name: "Fatma Al-Saeed", email: "fatma.fin@corporate.com", id: "EMP-FIN-002", dob: "1994-05-19", gender: "Female", status: "Single", des: "Financial Analyst", base: 7500, deptIdx: 1, att: "Present", sal: { all: 300, ded: 0 } },
            { name: "Hany Shaker", email: "hany.fin@corporate.com", id: "EMP-FIN-003", dob: "1991-09-07", gender: "Male", status: "Married", des: "Payroll Officer", base: 7000, deptIdx: 1, att: "Vacancy", vac: { type: "Casual vacancy", reason: "Urgent maintenance issue at home requiring immediate presence.", status: "Approved" }, sal: { all: 250, ded: 0 } },
            // IT
            { name: "Ali Hassan", email: "ali.it@corporate.com", id: "EMP-IT-001", dob: "1993-03-22", gender: "Male", status: "Single", des: "System Administrator", base: 9000, deptIdx: 2, att: "Absent", sal: { all: 500, ded: 300 } },
            { name: "Nour El-Din", email: "nour.it@corporate.com", id: "EMP-IT-002", dob: "1996-07-14", gender: "Male", status: "Single", des: "Technical Support Specialist", base: 6500, deptIdx: 2, att: "Present", sal: { all: 300, ded: 0 } },
            { name: "Mona Al-Zahrani", email: "mona.it@corporate.com", id: "EMP-IT-003", dob: "1994-10-30", gender: "Female", status: "Married", des: "Network Engineer", base: 8800, deptIdx: 2, att: "Vacancy", vac: { type: "Annual vacancy", reason: "Attending an external cybersecurity conference on behalf of the firm.", status: "Approved" }, sal: { all: 450, ded: 0 } },
            // Operations
            { name: "Khaled Al-Masri", email: "khaled.ops@corporate.com", id: "EMP-OPS-001", dob: "1987-12-05", gender: "Male", status: "Married", des: "Operations Supervisor", base: 8000, deptIdx: 3, att: "Present", sal: { all: 350, ded: 0 } },
            { name: "Layla Mahmoud", email: "layla.ops@corporate.com", id: "EMP-OPS-002", dob: "1993-02-18", gender: "Female", status: "Married", des: "Operations Coordinator", base: 6200, deptIdx: 3, att: "Sick", vac: { type: "Sick vacancy", reason: "Sudden flight delay returning from annual vacation.", status: "Pending" }, sal: { all: 200, ded: 0 } },
            { name: "Omar Al-Sharif", email: "omar.ops@corporate.com", id: "EMP-OPS-003", dob: "1995-06-25", gender: "Male", status: "Single", des: "Logistics Officer", base: 6000, deptIdx: 3, att: "Present", sal: { all: 200, ded: 0 } },
            // Sales
            { name: "Youssef Khalil", email: "youssef.sales@corporate.com", id: "EMP-SAL-001", dob: "1992-05-11", gender: "Male", status: "Single", des: "Account Manager", base: 5000, deptIdx: 4, att: "Present", sal: { all: 800, ded: 0 } },
            { name: "Yasmin Al-Harbi", email: "yasmin.sales@corporate.com", id: "EMP-SAL-002", dob: "1996-09-12", gender: "Female", status: "Single", des: "Sales Executive", base: 4500, deptIdx: 4, att: "Present", sal: { all: 600, ded: 0 } },
            { name: "Mustafa Kamel", email: "mustafa.sales@corporate.com", id: "EMP-SAL-003", dob: "1990-08-04", gender: "Male", status: "Married", des: "Business Development", base: 5200, deptIdx: 4, att: "Present", vac: { type: "Casual vacancy", reason: "Relocating for family vacation housing balance over the weekend.", status: "Rejected" }, sal: { all: 400, ded: 20 } }
        ];

        for (let data of empRawData) {
            
            const user = await User.create({ name: data.name, email: data.email, password: passwordHash, role: "employee" });
            
            
            const employee = await Employee.create({
                userId: user._id,
                employeeId: data.id,
                dob: new Date(data.dob),
                gender: data.gender,
                maritalStatus: data.status,
                designation: data.des,
                department: depts[data.deptIdx]._id,
                salary: data.base
            });

            
            await Attendance.create({ date: dateStr, employeeId: employee._id, status: data.att });

            
            if (data.vac) {
                await Vacancy.create({
                    employeeId: employee._id,
                    vacancyType: data.vac.type,
                    startDate: new Date(dateStr),
                    endDate: new Date(dateStr),
                    reason: data.vac.reason,
                    status: data.vac.status
                });
            }

        
            await Salary.create({
                employeeId: employee._id,
                basicSalary: data.base,
                allowances: data.sal.all,
                deductions: data.sal.ded,
                netSalary: (data.base + data.sal.all) - data.sal.ded,
                payDate: new Date(dateStr)
            });
        }

        console.log("Database seeded successfully with 15 corporate profiles!");
        process.exit();
    } catch (err) {
        console.error("Seeding crashed:", err);
        process.exit(1);
    }
};

seed();