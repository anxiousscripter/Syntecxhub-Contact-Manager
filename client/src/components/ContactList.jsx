import ContactCard from './ContactCard';

function ContactList({ contacts, onEdit, onDelete }) {
	if (contacts.length === 0) {
		return (
			<div className="empty-state">
				<h3>No contacts found</h3>
				<p>Your contacts will appear here once you add them.</p>
			</div>
		);
	}

	return (
		<div className="contact-list">
			{contacts.map((contact) => (
				<ContactCard
					key={contact._id}
					contact={contact}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
}

export default ContactList;
