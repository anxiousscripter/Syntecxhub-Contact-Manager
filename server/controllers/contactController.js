const Contact = require('../models/Contact');

// Create a new contact
const createContact = async (req, res) => {
	try {
		const { name, email, phone, company, notes } = req.body;

		// Basic validation
		if (!name || !email || !phone) {
			return res.status(400).json({
				error: 'Name, email and phone are required.',
			});
		}

		// Create and save the contact
		const contact = await Contact.create({
			name,
			email,
			phone,
			company,
			notes,
		});

		res.status(201).json({
			message: 'Contact created successfully!',
			contact,
		});
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				error: error.message,
			});
		}

		console.error('Error creating contact:', error);

		res.status(500).json({
			error: 'Failed to create contact.',
		});
	}
};

// Get all contacts
const getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find().sort({ createdAt: -1 });

		res.status(200).json({
			count: contacts.length,
			contacts,
		});
	} catch (error) {
		console.error('Error fetching contacts:', error);

		res.status(500).json({
			error: 'Failed to retrieve contacts.',
		});
	}
};

// Update a contact
const updateContact = async (req, res) => {
	try {
		const { name, email, phone, company, notes } = req.body;

		const contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{
				name,
				email,
				phone,
				company,
				notes,
			},
			{
				new: true,
				runValidators: true,
			},
		);

		if (!contact) {
			return res.status(404).json({
				error: 'Contact not found.',
			});
		}

		res.status(200).json({
			message: 'Contact updated successfully!',
			contact,
		});
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({
				error: error.message,
			});
		}

		if (error.name === 'CastError') {
			return res.status(400).json({
				error: 'Invalid contact ID.',
			});
		}

		console.error('Error updating contact:', error);

		res.status(500).json({
			error: 'Failed to update contact.',
		});
	}
};

// Delete a contact
const deleteContact = async (req, res) => {
	try {
		const contact = await Contact.findByIdAndDelete(req.params.id);

		if (!contact) {
			return res.status(404).json({
				error: 'Contact not found.',
			});
		}

		res.status(200).json({
			message: 'Contact deleted successfully!',
			contact,
		});
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({
				error: 'Invalid contact ID.',
			});
		}

		console.error('Error deleting contact:', error);

		res.status(500).json({
			error: 'Failed to delete contact.',
		});
	}
};

module.exports = {
	createContact,
	getContacts,
	updateContact,
	deleteContact,
};
