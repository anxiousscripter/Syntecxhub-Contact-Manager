const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			match: [
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				'Please enter a valid email address',
			],
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		company: {
			type: String,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Contact', contactSchema);
