import { useEffect, useState } from 'react';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

import {
	getContacts,
	createContact as apiCreateContact,
	updateContact as apiUpdateContact,
	deleteContact as apiDeleteContact,
} from './services/contactService';

import './App.css';

function App() {
	const [contacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [editingContact, setEditingContact] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [showForm, setShowForm] = useState(false);

	// Retrieve contacts when the application loads
	useEffect(() => {
		fetchContacts();
	}, []);

	const fetchContacts = async () => {
		try {
			setLoading(true);
			setError('');

			const data = await getContacts();

			setContacts(data.contacts);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	// Add or update a contact
	const handleSubmit = async (contactData) => {
		try {
			setSaving(true);
			setError('');
			setMessage('');

			if (editingContact) {
				const data = await apiUpdateContact(
					editingContact._id,
					contactData,
				);

				setContacts((previousContacts) =>
					previousContacts.map((contact) =>
						contact._id === editingContact._id
							? data.contact
							: contact,
					),
				);

				setMessage('Contact updated successfully!');
			} else {
				const data = await apiCreateContact(contactData);

				setContacts((previousContacts) => [
					data.contact,
					...previousContacts,
				]);

				setMessage('Contact added successfully!');
			}

			setEditingContact(null);
			setShowForm(false);
		} catch (error) {
			setError(error.message);
		} finally {
			setSaving(false);
		}
	};

	// Open the form for editing
	const handleEdit = (contact) => {
		setEditingContact(contact);
		setShowForm(true);
		setError('');
		setMessage('');
	};

	// Delete a contact
	const handleDelete = async (id) => {
		const confirmed = window.confirm(
			'Are you sure you want to delete this contact?',
		);

		if (!confirmed) return;

		try {
			setError('');
			setMessage('');

			await apiDeleteContact(id);

			setContacts((previousContacts) =>
				previousContacts.filter((contact) => contact._id !== id),
			);

			setMessage('Contact deleted successfully!');

			if (editingContact?._id === id) {
				setEditingContact(null);
				setShowForm(false);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	// Open the form for adding a new contact
	const handleAddNew = () => {
		setEditingContact(null);
		setShowForm(true);
		setError('');
		setMessage('');
	};

	// Close the contact form
	const handleCancel = () => {
		setEditingContact(null);
		setShowForm(false);
		setError('');
	};

	// Filter contacts based on search input
	const filteredContacts = contacts.filter((contact) => {
		const search = searchTerm.toLowerCase();

		return (
			contact.name.toLowerCase().includes(search) ||
			contact.email.toLowerCase().includes(search) ||
			contact.phone.toLowerCase().includes(search) ||
			(contact.company || '').toLowerCase().includes(search)
		);
	});

	return (
		<div className="app-container">
			<header className="app-header">
				<div className="header-content">
					<div className="brand">
						<h1>Contact Manager</h1>
						<p>Keep your connections organized.</p>
					</div>

					<button className="btn btn-primary" onClick={handleAddNew}>
						+ Add Contact
					</button>
				</div>
			</header>

			<main className="main-content">
				<section className="dashboard">
					<div className="dashboard-heading">
						<div>
							<h2>Your Contacts</h2>
							<p>{contacts.length} contacts saved</p>
						</div>
					</div>

					<input
						type="search"
						className="search-input"
						placeholder="Search by name, email, phone or company..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					{error && <div className="alert alert-error">{error}</div>}

					{message && (
						<div className="alert alert-success">{message}</div>
					)}

					{showForm && (
						<div className="form-container">
							<ContactForm
								initialData={editingContact}
								onSubmit={handleSubmit}
								onCancel={handleCancel}
								saving={saving}
							/>
						</div>
					)}

					{loading ? (
						<p className="status-message">Loading contacts...</p>
					) : (
						<>
							{searchTerm && (
								<p className="results-count">
									Showing {filteredContacts.length} of{' '}
									{contacts.length} contacts
								</p>
							)}

							<ContactList
								contacts={filteredContacts}
								onEdit={handleEdit}
								onDelete={handleDelete}
							/>
						</>
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
