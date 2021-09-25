
const userSignup = (req, res, next) => {
	const { password, email, name } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		next(new Error('name, email and password Must be Defined in request body'));
	} else {
		next();
	}
};

const googleAuth = (req, res, next) => {
	const { email, name, googleId } = req.body;

	if (!name || !email || !googleId) {
		res.status(400);
		next(new Error('name, email and googleId Must be Defined in request body'));
	} else {
		next();
	}
};

const checkEmail = (req, res, next) => {
	const { email } = req.body;

	if (!email) {
		res.status(400);
		next(new Error('email Must be Defined in request body'));
	} else {
		next();
	}
};

const userSignin = (req, res, next) => {
	const { password, email } = req.body;
	if (!email || !password) {
		res.status(400);
		next(new Error('email, password Must be Defined in request body'));
	} else {
		next();
	}
};

const updatePass = (req, res, next) => {
	const { password } = req.body;
	if (!password) {
		res.status(400);
		next(new Error('password Must be Defined in request body'));
	} else {
		next();
	}
};

const paymentByUser = (req, res, next) => {
	const { token } = req.body;
	if (!token) {
		res.status(400);
		next(new Error('token Must be Defined in request body'));
	} else {
		next();
	}
};

export default { userSignup, userSignin, googleAuth, checkEmail, updatePass, paymentByUser };
