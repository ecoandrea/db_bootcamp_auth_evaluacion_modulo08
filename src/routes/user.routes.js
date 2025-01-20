
import { Router } from 'express'
import {  deleteUserById, findAll, findUserById, updateUser } from '../controllers/user.controller.js';


const router = Router();


router.get('/user/:id', findUserById);
router.get('/user', findAll);
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUserById)
 

export default router