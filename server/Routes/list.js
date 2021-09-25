import express from 'express';
import listHandler from '../Controllers/list';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';

const listRouter = express.Router();

listRouter.post('/', isLoggedInUser.isLoggedIn, listHandler.addList);

listRouter.get('/:bid', isLoggedInUser.isLoggedIn, listHandler.getAllListsOfBoard);

listRouter.delete('/:id', isLoggedInUser.isLoggedIn, listHandler.deleteList);

listRouter.patch('/:id', isLoggedInUser.isLoggedIn, listHandler.updateList);

export default listRouter;
