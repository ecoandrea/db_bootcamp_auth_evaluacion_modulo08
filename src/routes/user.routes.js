
import { Router } from 'express'
import {  deleteUserById, findAll, findUserById, updateUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = Router();


router.get('/user/:id', authMiddleware, findUserById);
router.get('/user', authMiddleware, findAll);
router.put('/user/:id', authMiddleware,  updateUser)
router.delete('/user/:id', authMiddleware, deleteUserById)
 

export default router