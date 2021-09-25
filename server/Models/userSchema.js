const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		email: {
			type: String,
		},
		userType: {
			type: String,
			default: 'user',
		},
		companyName: {
			type: String,
			default: ''
		},
		companyWebsite: {
			type: String,
			default: ''
		},
		contactNumber: {
			type: String,
			default: ''
		},
		paid: {
			type: Boolean,
			default: false,
		},
		imageUrl: {
			type: String,
			default: 'https://bestpartyintheworld.s3.amazonaws.com/default-avatar.png',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('users', userSchema);
