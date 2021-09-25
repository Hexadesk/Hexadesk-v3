import express from 'express';
import signInHandler from '../Controllers/userSignin';
import googleAuthHandler from '../Controllers/googleAuth';
import adminSignIn from '../Controllers/adminSignin';
import userSignUp from '../Controllers/userSignup';
import userHandler from '../Controllers/user';
import userValidator from '../validations/user';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const authRouter = express.Router();

authRouter.get('/users', userHandler.getAllUsers);

authRouter.post('/signin', userValidator.userSignin, signInHandler.userSignIn);

authRouter.post('/pay', isLoggedInUser.isLoggedIn, userValidator.paymentByUser, userHandler.paymentByUser);

authRouter.post('/signup', userValidator.userSignup, userSignUp);

authRouter.post('/google', userValidator.googleAuth, googleAuthHandler.registerUser);

authRouter.post('/signin/admin', adminSignIn);

authRouter.post('/check/email', userValidator.checkEmail, userHandler.checkEmail);

authRouter.post('/reset/:id', userValidator.updatePass, userHandler.updatePass);

export default authRouter;
