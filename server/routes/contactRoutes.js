const express = require('express');
const router = express.Router();

const {
	createContact,
	getContacts,
	updateContact,
	deleteContact,
} = require('../controllers/contactController');

// GET /api/contacts
router.get('/', getContacts);

// POST /api/contacts
router.post('/', createContact);

// PUT /api/contacts/:id
router.put('/:id', updateContact);

// DELETE /api/contacts/:id
router.delete('/:id', deleteContact);

module.exports = router;
