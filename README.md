# Contact Manager

A full-stack Contact Management Application built with React, Node.js, Express, and MongoDB. The application allows users to create, view, update, delete, and search contacts through a responsive user interface.

## Features

- **Create Contacts:** Add new contacts with their name, email, phone number, company, and notes.
- **View Contacts:** Retrieve and display all saved contacts.
- **Update Contacts:** Edit existing contact information.
- **Delete Contacts:** Remove contacts with a confirmation prompt.
- **Search Contacts:** Search contacts by name, email, phone number, or company.
- **Form Validation:** Validate required fields and email formats.
- **Error Handling:** Handle invalid requests, missing contacts, and server errors.
- **Database Integration:** Persist contact information using MongoDB.

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- REST API

## Project Structure

```text
contact-manager/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactList.jsx
│   │   │   └── ContactCard.jsx
│   │   ├── services/
│   │   │   └── contactService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── .env.local
│
└── server/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── contactController.js
    ├── models/
    │   └── Contact.js
    ├── routes/
    │   └── contactRoutes.js
    ├── .env
    ├── .gitignore
    ├── package.json
    └── server.js
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- MongoDB Atlas account
- Git (optional)

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd contact-manager
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

The backend dependencies include:

- express
- mongoose
- dotenv
- cors

For development, Nodemon can be used to automatically restart the server when changes are detected.

```bash
npm install --save-dev nodemon
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Replace `YOUR_MONGODB_CONNECTION_STRING` with your MongoDB Atlas connection string.

Ensure that your MongoDB Atlas network access settings and database credentials allow your application to connect.

### 4. Configure the Frontend

Navigate to the client directory:

```bash
cd ../client
npm install
```

Create a `.env.local` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api/contacts
```

This configures the frontend to communicate with the backend API.

### 5. Run the Application

The frontend and backend must run simultaneously in separate terminals.

**Start the backend:**

```bash
cd server
npm run dev
```

The backend will run at:

`http://localhost:5000`

**Start the frontend:**

```bash
cd client
npm run dev
```

Vite will provide a local development URL, usually:

`http://localhost:5173`

Open the frontend URL in your browser to use the application.

## API Endpoints

The backend exposes the following REST API endpoints:

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/contacts`     | Retrieve all contacts      |
| POST   | `/api/contacts`     | Create a new contact       |
| PUT    | `/api/contacts/:id` | Update an existing contact |
| DELETE | `/api/contacts/:id` | Delete a contact           |

### Example: Create a Contact

**POST** `/api/contacts`

Request body:

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"phone": "+260971234567",
	"company": "Example Ltd",
	"notes": "Business associate"
}
```

### Example: Update a Contact

**PUT** `/api/contacts/:id`

Use the contact's MongoDB document ID in the URL and provide the updated contact information in the JSON request body.

### Example: Delete a Contact

**DELETE** `/api/contacts/:id`

Provide the contact's MongoDB document ID in the URL.

## Testing

The API endpoints can be tested using Postman.

Recommended tests include:

- Creating a contact with valid information.
- Retrieving all saved contacts.
- Updating an existing contact.
- Deleting an existing contact.
- Submitting incomplete contact information.
- Submitting an invalid email address.
- Attempting to update or delete a nonexistent contact.
- Providing an invalid MongoDB document ID.

The frontend can also be tested directly through the browser by performing the available contact management operations.

## Learning Outcomes

Through this project, I gained practical experience with:

- Building RESTful APIs using Node.js and Express.
- Creating and managing MongoDB schemas using Mongoose.
- Implementing CRUD operations.
- Developing reusable React components.
- Managing application state using React Hooks.
- Connecting a React frontend to a backend API.
- Implementing basic validation and error handling.
- Organizing a full-stack application using a modular project structure.

## License

This project was developed as part of an internship assignment and is intended for educational and portfolio purposes.
