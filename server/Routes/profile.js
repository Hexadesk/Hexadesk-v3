import express from 'express';
import multer from 'multer';
import profileHandler from '../Controllers/user';
import activityHandler from '../Controllers/activity';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const storage = multer.memoryStorage();
const upload = multer({
    storage,
});
const profileRouter = express.Router();

profileRouter.get('/', isLoggedInUser.isLoggedIn, profileHandler.getSingleProfile);

profileRouter.get('/activity', isLoggedInUser.isLoggedIn, activityHandler.getAllActivitiesOfUser);

profileRouter.patch('/', upload.single('imageUrl'), isLoggedInUser.isLoggedIn, profileHandler.updateProfile);

export default profileRouter;
