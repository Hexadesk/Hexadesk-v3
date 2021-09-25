import express from 'express';
import multer from 'multer';
import itemHandler from '../Controllers/item';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
import itemValidator from '../validations/item';

const storage = multer.memoryStorage();
const upload = multer({
    storage,
});

const itemRouter = express.Router();

itemRouter.post(
    '/',
    upload.array('images'),
    isLoggedInUser.isLoggedIn,
    itemHandler.addItem,
);

// itemRouter.post(
//     '/multiple/files',
//     upload.fields([{
//         name: 'docs', maxCount: 2
//     }, {
//         name: 'links', maxCount: 1
//     }]),
//     itemHandler.addMultipleFiles,
// );

itemRouter.get('/board/:bid', isLoggedInUser.isLoggedIn, itemHandler.getAllItemsOfBoard);

itemRouter.get('/search/filter', isLoggedInUser.isLoggedIn, itemHandler.searchItemsByFilter);

itemRouter.get('/user/board/:bid', isLoggedInUser.isLoggedIn, itemHandler.getAllItemsOfUserByBoard);

itemRouter.get('/user', isLoggedInUser.isLoggedIn, itemHandler.getAllItemsOfUser);

itemRouter.get('/:id', isLoggedInUser.isLoggedIn, itemHandler.getSingleItem);

itemRouter.get('/test/test', itemHandler.testt);

itemRouter.post('/upload/doc', upload.single('file'), itemHandler.uploadDocument);

itemRouter.delete(
    '/:id',
    isLoggedInUser.isLoggedIn,
    itemHandler.deleteItem
);

itemRouter.patch('/:id', isLoggedInUser.isLoggedIn, itemHandler.updateItem);

itemRouter.patch('/:id/delete/doc', upload.single('file'), isLoggedInUser.isLoggedIn, itemHandler.deleteDocument);


export default itemRouter;
