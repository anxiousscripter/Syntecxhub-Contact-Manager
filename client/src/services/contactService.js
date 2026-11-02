const API_URL = import.meta.env.VITE_API_URL;

// Retrieve all contacts
export const getContacts = async () => {
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error('Failed to retrieve contacts.');
	}

	return response.json();
};

// Create a new contact
export const createContact = async (contactData) => {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(contactData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error || 'Failed to create contact.');
	}

	return data;
};

// Update an existing contact
export const updateContact = async (id, contactData) => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(contactData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error || 'Failed to update contact.');
	}

	return data;
};

// Delete a contact
export const deleteContact = async (id) => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: 'DELETE',
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error || 'Failed to delete contact.');
	}

	return data;
};
