# Enterprise Employee Management & Attendance System (MERN Stack)

A professional, full-stack Enterprise Resource Planning (ERP) subsystem designed for Human Resource (HR) departments to manage corporate structures, track daily attendance, process payroll operations, and evaluate vacancy requests.

## 🚀 Key Engineering Features

- **Dynamic Analytics Dashboard:**
-  Utilizes MongoDB Aggregation Pipelines to compute real-time metrics,
- including active headcounts, department counts, total monthly payroll expenditures, and classified vacancy ratios.
- **Cascade Deletion Integrity:**
- Implements Mongoose pre-hook middleware to dynamically enforce referential integrity. Deleting a department safely purges all linked employee profiles,
- salaries, and vacancy records sequentially.
- **Timezone-Resilient Attendance Ledger:**
- Uses an automated custom middleware to initialize daily sheets.
-  Queries operate within defensive absolute time ranges (`00:00:00` to `23:59:59`) to negate international timezone offsets.
- **Role-Based Access Control (RBAC):**
- Secured via JSON Web Tokens (JWT) stored in client session storage,
- separating absolute administrative controls from restricted employee self-service portals.
- **Clean Client Performance:**
- Built with React Data Tables and custom state synchronization mechanisms to allow smooth filtering,
- pagination, and multi-record indexing without reloading views.

## 🛠️ Tech Stack & Architecture

- **Frontend:** React.js, Vite, Tailwind CSS, React Router DOM, Axios, SweetAlert2.
- **Backend:** Node.js, Express.js, Mongoose ODM.
- **Database:** MongoDB.
- **Authentication:** Bcrypt.js (Password Hashing), JWT (Tokenization).

---

## 💻 Local Installation & Configuration

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Server running locally or via Atlas Atlas cluster.

### 1. Backend Setup
Navigate to the backend directory and install active dependencies:
```bash
cd backend
npm install

## 1. Create a .env file inside the backend folder and populate it with the following environment variables:
PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/attendance
JWT_SECRET_KEY=your_secure_jwt_random_secret_string
