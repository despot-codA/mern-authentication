import express from 'express';
import mongoose from 'mongoose';
import { 
    authUser, 
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', registerUser); //register
router.post('/auth', authUser); //login
router.post('/logout', logoutUser); //logout
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;