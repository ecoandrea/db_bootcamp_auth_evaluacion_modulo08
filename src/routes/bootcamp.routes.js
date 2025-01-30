import { Router } from 'express'
import { addUser, createBootcamp, deleteBootcampById, findAll,  findById,  updateBootcamp } from '../controllers/bootcamp.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = Router();

router.post('/bootcamp', authMiddleware, createBootcamp)
router.post('/bootcamp/addUser', authMiddleware, addUser)
router.get('/bootcamp', findAll);
router.get('/bootcamp/:id', authMiddleware, findById) 
router.put('/bootcamp/:id', authMiddleware, updateBootcamp)
router.delete('/bootcamp/:id', authMiddleware, deleteBootcampById)



export default router 

