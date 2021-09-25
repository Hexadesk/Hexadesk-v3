import express from 'express';
import cardHandler from '../Controllers/card';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
// import eventValidator from '../validations/event';

const cardRouter = express.Router();

cardRouter.post(
    '/',
    isLoggedInUser.isLoggedIn,
    // eventValidator.addEvent,
    cardHandler.addCard,
);

cardRouter.get('/', isLoggedInUser.isLoggedIn, cardHandler.getAllCards);

cardRouter.get('/:id', isLoggedInUser.isLoggedIn, cardHandler.getCardById);

// only admin can delete
// cardRouter.delete(
// 	'/delete/:id',
// 	isAdminMiddleware.isManagerOwner,
// 	events.deleteEvent,
// );

cardRouter.post('/reorder/samecol', isLoggedInUser.isLoggedIn, cardHandler.reOrderCardsInSameColumn);

cardRouter.post('/reorder/diffcol', isLoggedInUser.isLoggedIn, cardHandler.reOrderCardsInDifferentColumn);

export default cardRouter;
