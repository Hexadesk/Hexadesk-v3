import Model from '../Models/Model';
import authHandler from './userSignin';
// import paymentHandler from './payment';
import boardHandler from './board';

const registerUser = (req, res, next) => {
	const { googleId, email, name, imageUrl, stripeToken, boardId, role } = req.body;
	Model.UserModel.findOne({ googleId }).then(user => {
		if (user) {
			authHandler.createToken(user, res, next);
		} else {
			// first we will process payment
			// const StripeOptions = {
			// 	amount: 10 * 100,
			// 	currency: 'USD',
			// 	description: 'Subscription fee',
			// 	payment_method: stripeToken,
			// 	confirm: true,
			// };
			// paymentHandler.stripePayment(StripeOptions)
			// 	.then(success => {
			const newUser = new Model.UserModel({
				name,
				email,
				googleId,
				imageUrl
			});
			newUser.save().then(async SavedUser => {
				if (boardId !== undefined) {
					console.log('mside');
					await boardHandler.addMemberToBoard(boardId, SavedUser._id, role);
				}
				authHandler.createToken(SavedUser, res, next);
			}).catch(err => {
				res.status(500);
				next(new Error('Internal Server Error!'));
			});
			// }).catch(err => {
			// 	res.status(500);
			// 	next(new Error('Internal Server Error!'));
			// });
		}
	}).catch(err => {
		res.status(500);
		next(new Error('Internal Server Error!'));
	});
};

export default { registerUser };
