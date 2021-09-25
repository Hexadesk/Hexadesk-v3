import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';
import authHandler from './userSignin';
import boardHandler from './board';
// import awsHandler from './aws';

const userSignUp = (req, res, next) => {
	const { name, password, email, boardId, role } = req.body;
	const query = { email };
	Model.UserModel.findOne(query)
		.then((user) => {
			if (user) {
				if (user.email == email) {
					res.status(400);
					next(new Error('Email Already Taken.'));
				}
			} else {
				bcryptjs.hash(password, 12).then((hashedpassword) => {
					const User = new Model.UserModel({
						name,
						password: hashedpassword,
						email,
					});
					User.save()
						.then(async (SavedUser) => {
							if (boardId !== undefined) {
								const member = {
									id: SavedUser._id,
									email: SavedUser.email,
									role,
								};
								await boardHandler.addMemberToBoardOnSignup(boardId, member);
							}
							authHandler.createToken(SavedUser, res, next);
						})
						.catch((err) => {
							res.status(500);
							next(
								new Error(
									'Internal Server Error!',
								),
							);
						});
				});
				// }).catch(err => {
				// 	console.log('Error from stripe!', err);
				// 	res.status(500);
				// 	next(new Error('Internal Server Error!'));
				// });
			}
		})
		.catch((err) => {
			res.status(500);
			next(new Error('Internal Server Error!'));
		});
};

export default userSignUp;
