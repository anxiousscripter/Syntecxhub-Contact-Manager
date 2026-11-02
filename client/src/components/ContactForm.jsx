import { useEffect, useState } from 'react';

const emptyForm = {
	name: '',
	email: '',
	phone: '',
	company: '',
	notes: '',
};

function ContactForm({ initialData, onSubmit, onCancel, saving }) {
	const [formData, setFormData] = useState(emptyForm);

	// Populate the form when editing a contact
	useEffect(() => {
		if (initialData) {
			setFormData({
				name: initialData.name || '',
				email: initialData.email || '',
				phone: initialData.phone || '',
				company: initialData.company || '',
				notes: initialData.notes || '',
			});
		} else {
			setFormData(emptyForm);
		}
	}, [initialData]);

	// Update form state when an input changes
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((previousData) => ({
			...previousData,
			[name]: value,
		}));
	};

	// Submit form information
	const handleSubmit = (e) => {
		e.preventDefault();

		onSubmit({
			...formData,
			name: formData.name.trim(),
			email: formData.email.trim(),
			phone: formData.phone.trim(),
			company: formData.company.trim(),
			notes: formData.notes.trim(),
		});
	};

	return (
		<form className="contact-form" onSubmit={handleSubmit}>
			<div className="form-header">
				<h2>{initialData ? 'Edit Contact' : 'Add New Contact'}</h2>
				<p>
					{initialData
						? 'Update your contact information.'
						: 'Enter the details of your new contact.'}
				</p>
			</div>

			<div className="form-group">
				<label htmlFor="name">Full Name *</label>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="e.g. John Doe"
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="email">Email Address *</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="e.g. john@example.com"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="phone">Phone Number *</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					placeholder="e.g. +260971234567"
					value={formData.phone}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="company">Company</label>
				<input
					type="text"
					id="company"
					name="company"
					placeholder="Company name (optional)"
					value={formData.company}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="notes">Notes</label>
				<textarea
					id="notes"
					name="notes"
					placeholder="Additional information..."
					value={formData.notes}
					onChange={handleChange}
					rows="3"
				/>
			</div>

			<div className="form-actions">
				<button
					type="button"
					className="btn btn-secondary"
					onClick={onCancel}
					disabled={saving}>
					Cancel
				</button>

				<button
					type="submit"
					className="btn btn-primary"
					disabled={saving}>
					{saving
						? 'Saving...'
						: initialData
							? 'Save Changes'
							: 'Add Contact'}
				</button>
			</div>
		</form>
	);
}

export default ContactForm;
