import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { updateUserController } from '../controllers/userController.js';

//router object
const router = express.Router();

//router
//Get Users || GET
//update || user PUT
router.put('/update-user',userAuth,updateUserController)
export default router