import { Router } from 'express'
import { addUser, createBootcamp, deleteBootcampById, findAll,  findById,  updateBootcamp } from '../controllers/bootcamp.controller.js';




const router = Router();

router.post('/bootcamp', createBootcamp)
router.get('/bootcamp', findAll);
router.get('/bootcamp/:id', findById) 
router.post('/bootcamp/users/:bootcampId', addUser)
router.put('/bootcamp/:id', updateBootcamp)
router.delete('/bootcamp/:id', deleteBootcampById)





export default router 

