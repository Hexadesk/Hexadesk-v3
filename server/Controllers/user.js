import Model from '../Models/Model';
import bcryptjs from 'bcryptjs';
import paymentHandler from './payment';
import authHandler from './userSignin';
import forgotPassEmailHandler from './forgotPassMail';
import awsHandler from './aws';

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
                    username: user.name,
                    id: user._id
                };
                forgotPassEmailHandler.emailToExec(req, res, next,
                    data,
                    process.env.SERVICE_EMAIL,
                    'Reset Password',
                    user.email
                );
            }
        })
        .catch((err) => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
}

const updatePass = (req, res, next) => {
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
                            `Internal Server Error!`,
                        ),
                    );
                } else {
                    res.status(200).send({ Message: "Password Updated Successfully" });
                }
            }
        );
    });
};

const paymentByUser = (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
    const { token } = req.body;
    // first we will process payment
    const StripeOptions = {
        amount: 10 * 100,
        currency: 'USD',
        description: 'Subscription fee',
        payment_method: token,
        confirm: true,
    };
    paymentHandler.stripePayment(StripeOptions)
        .then(success => {
            console.log('success case', success);
            Model.UserModel.findByIdAndUpdate(
                req.user._id,
                {
                    $set: {
                        paid: true,
                    }
                },
                { new: true },
                (err, doc) => {
                    if (err) {
                        res.status(500);
                        next(
                            new Error(
                                'Internal Server Error!',
                            ),
                        );
                    } else {
                        console.log(doc);
                        authHandler.createToken(doc, res, next);
                    }
                }
            );
        }).catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

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

const getAllUsers = (req, res, next) => {
    Model.UserModel.find()
        .then(users => {
            res.status(200).send({ users });
        })
        .catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

export default { checkEmail, updatePass, paymentByUser, getSingleProfile, updateProfile, getAllUsers };