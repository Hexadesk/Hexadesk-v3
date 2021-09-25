import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';
import authHandler from './userSignin';
import awsHandler from './aws';

// single profile by userid
const getSingleProfile = (req, res, next) => {
	const { _id } = req.user;

	Model.UserModel.findOne({ _id })
		.then(profile => {
			if (!profile) {
				res.status(404);
				next(
					new Error(
						'Profile Not Found!',
					),
				);
			} else {
				res.status(200).send({ profile });
			}
		})
		.catch(err => {
			res.status(500);
			next(
				new Error(
					`Internal Server Error!`,
				),
			);
		});
};

const updateProfile = async (req, res, next) => {
	const { _id } = req.user;
	const bodyData = req.body;
	if (req.file) {
		const image = await awsHandler.UploadToAws(req.file);
		bodyData.imageUrl = image;
	}
	const query = { $set: bodyData };
	Model.UserModel.findByIdAndUpdate(
		_id,
		query,
		{ upsert: true, new: true },
		(err, doc) => {
			if (err) {
				res.status(500);
				next(
					new Error(
						`Internal Server Error!`,
					),
				);
			} else {
				authHandler.createToken(doc, res, next);
			}
		}
	);
}


const updatePassword = (req, res, next) => {
	const { password } = req.body;
	bcryptjs.hash(password, 12).then((hashedpassword) => {
		Model.UserModel.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					password: hashedpassword,
				}
			},
			{ new: true },
			(err, doc) => {
				if (err) {
					res.status(500);
					next(
						new Error(
							`Internal Server Error, Please Try later.`,
						),
					);
				} else {
					res.status(200).send({ Message: "Password Updated Successfully" });
				}
			}
		);
	});
};

const verifyAccount = (req, res, next) => {
	Model.UserModel.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				verify: true,
			}
		},
		{ new: true },
		(err, doc) => {
			if (err) {
				res.status(500);
				next(
					new Error(
						`Internal Server Error, Please Try later.`,
					),
				);
			} else {
				authHandler.createToken(doc, res, next);
			}
		}
	);
};

const updateProfileVerificationByAdmin = (req, res, next) => {
	const { verify } = req.body;
	Model.UserModel.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				verify,
			}
		},
		{ new: true },
		(err, doc) => {
			if (err) {
				res.status(500);
				next(
					new Error(
						`Internal Server Error, Please Try later.`,
					),
				);
			} else {
				res.status(200).send({ message: "Successfully Updated Status" });
			}
		}
	);
};


const checkEmail = (req, res, next) => {
	const { email } = req.body;
	const query = { email };

	Model.UserModel.findOne(query)
		.then((user) => {
			if (!user) {
				res.status(404);
				next(
					new Error(
						'Email Not Found!',
					),
				);
			} else {
				const data = {
					username: user.username,
					id: user._id
				};
				forgotPassEmailHandler.emailToExec(req, res, next,
					data,
					'realestateservicenoreply@gmail.com',
					'Reset Password',
					user.email
				);
			}
		})
		.catch((err) => {
			res.status(500);
			next(new Error(err));
		});
}

const resendEmail = (req, res, next) => {
	const { id } = req.params;

	Model.UserModel.findOne({ _id: id })
		.then((user) => {
			if (!user) {
				res.status(404);
				next(
					new Error(
						'User Not Found!',
					),
				);
			} else {
				const data = {
					username: user.username,
					id: user._id
				};
				forgotPassEmailHandler.emailToExec(req, res, next,
					data,
					'realestateservicenoreply@gmail.com',
					'Reset Password',
					user.email
				);
			}
		})
		.catch((err) => {
			res.status(500);
			next(new Error(err));
		});
}



export default { updatePassword, checkTokenExpiry, checkEmail, verifyAccount, getBillingInfo, resendEmail, updateProfileVerificationByAdmin, updateProfile, getSingleProfile };
