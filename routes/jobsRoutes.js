import express from 'express'
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsControllers, jobStatsController, updateJobController } from '../controllers/jobsController.js';

const router = express.Router();

//router
//Get Jobs || POSt
router.post('/create-job',userAuth,createJobController)
//Get jobs || GET
router.get('/get-job',userAuth,getAllJobsControllers);

//update jobs || put || patch
router.patch("/update-job/:id",userAuth,updateJobController)

//delete jobs || put || patch
router.delete("/delete-job/:id",userAuth,deleteJobController)

// jobs stats || put || patch
router.get("/job-stats",userAuth,jobStatsController)

export default router




