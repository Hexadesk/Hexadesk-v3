import express from 'express';
import boardHandler from '../Controllers/board';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
import boardValidator from '../validations/board';

const boardRouter = express.Router();

boardRouter.post(
	'/',
	isLoggedInUser.isLoggedIn,
	boardValidator.addBoard,
	boardHandler.addBoard,
);

boardRouter.post('/click/invite', boardHandler.clickOnInvite);

boardRouter.post('/response/invite', boardHandler.responseToBoardInvite);

boardRouter.get('/', isLoggedInUser.isLoggedIn, boardHandler.getAllBoards);

boardRouter.get('/:id/members', isLoggedInUser.isLoggedIn, boardHandler.getAllMembersInBoard);

boardRouter.get('/:id', boardHandler.getSingleBoard);

boardRouter.delete(
	'/:id',
	isLoggedInUser.isLoggedIn,
	boardHandler.deleteBoard
);

boardRouter.patch('/:id', isLoggedInUser.isLoggedIn, boardHandler.updateBoard);

boardRouter.patch('/add/member', isLoggedInUser.isLoggedIn, boardHandler.addMemberToBoard);

boardRouter.patch('/:id/remove/member', isLoggedInUser.isLoggedIn, boardHandler.removeMemberFromBoard);

export default boardRouter;
