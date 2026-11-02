function ContactCard({ contact, onEdit, onDelete }) {
	const initials = contact.name
		.split(' ')
		.map((word) => word[0])
		.slice(0, 2)
		.join('')
		.toUpperCase();

	return (
		<article className="contact-card">
			<div className="contact-avatar">{initials}</div>

			<div className="contact-details">
				<h3>{contact.name}</h3>

				<p>{contact.email}</p>
				<p>{contact.phone}</p>

				{contact.company && (
					<span className="contact-company">{contact.company}</span>
				)}

				{contact.notes && (
					<p className="contact-notes">{contact.notes}</p>
				)}
			</div>

			<div className="contact-actions">
				<button
					className="btn btn-edit"
					onClick={() => onEdit(contact)}>
					Edit
				</button>

				<button
					className="btn btn-delete"
					onClick={() => onDelete(contact._id)}>
					Delete
				</button>
			</div>
		</article>
	);
}

export default ContactCard;
