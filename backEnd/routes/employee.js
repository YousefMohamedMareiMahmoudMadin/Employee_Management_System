import express from 'express';
import { verifyUser } from '../middleware/authMiddleware.js';
import { 
    addEmployee, 
    getEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee,
    upload 
} from '../controllers/employee.controller.js';

const router = express.Router();

router.get('/', verifyUser, getEmployees);
router.post('/add', verifyUser, upload.single('image'), addEmployee);
router.get('/:id', verifyUser, getEmployeeById);
router.put('/:id', verifyUser, upload.single('image'), updateEmployee);
router.delete('/:id', verifyUser, deleteEmployee);

export default router;