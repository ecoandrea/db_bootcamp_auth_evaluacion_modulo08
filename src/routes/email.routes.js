import { Router} from "express"
import { sendEmailController } from "../controllers/email.controller.js"


const router = Router();

router.post('/email', sendEmailController)

 

export default router