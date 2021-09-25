import express from 'express';
import notificationHandler from '../Controllers/notification';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const notificationRouter = express.Router();

notificationRouter.get('/', isLoggedInUser.isLoggedIn, notificationHandler.getAllNotificationsOfUser);

notificationRouter.patch('/status', isLoggedInUser.isLoggedIn, notificationHandler.updateNotificationStatus);

export default notificationRouter;
