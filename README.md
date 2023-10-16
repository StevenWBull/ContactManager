# Contact Directory Web Application

This is a simple web application built using Express.js to manage a contact directory. Users can add, view, update, and delete contact information. All contact data is stored in a local JSON file acting as the database.

## Routes and API Endpoints

### 1. View All Contacts

- **Route**: `/`
- **Method**: GET
- **Description**: Retrieves and displays all contacts.
- **Params**: None

### 2. View a Single Contact

- **Route**: `/contact/:id`
- **Method**: GET
- **Description**: Retrieves and displays a single contact by ID.
- **Params**:
  - `id` (Integer): The unique identifier of the contact.

### 3. Add a New Contact

- **Route**: `/add`
- **Method**: GET
- **Description**: Displays a form for adding a new contact.
- **Params**: None

- **Route**: `/add`
- **Method**: POST
- **Description**: Adds a new contact to the directory.
- **Params**:
  - `name` (String, Required): The name of the contact.
  - `phone` (String, Required): The phone number of the contact.
  - `email` (String, Required): The email address of the contact.
  - `address` (String, Optional): The address of the contact.

### 4. Edit a Contact

- **Route**: `/contact/:id`
- **Method**: GET
- **Description**: Displays a form for editing an existing contact.
- **Params**:
  - `id` (Integer): The unique identifier of the contact.

- **Route**: `/edit/:id`
- **Method**: PUT
- **Description**: Updates an existing contact by ID.
- **Params**:
  - `id` (Integer): The unique identifier of the contact.
  - `name` (String, Required): The updated name of the contact.
  - `phone` (String, Required): The updated phone number of the contact.
  - `email` (String, Required): The updated email address of the contact.
  - `address` (String, Optional): The updated address of the contact.

### 5. Delete a Contact

- **Route**: `/delete/:id`
- **Method**: DELETE
- **Description**: Deletes a contact by ID.
- **Params**:
  - `id` (Integer): The unique identifier of the contact.

## Middleware Function for Data Validation

- **Middleware**: `validateContact`
- **Description**: This middleware function validates the data submitted in POST and PUT requests to ensure that the required fields (`name`, `phone`, and `email`) are present and of the correct data type (string).

## How to Run the Application

1. Install Node.js if not already installed.
2. Clone the repository.
3. Navigate to the project directory in the terminal.
4. Install dependencies using `npm install`.
5. Start the application using `npm start`.
6. Access the application in your web browser at `http://localhost:3000`.

Enjoy managing your contact directory!
