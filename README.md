# React + Vite

This Is Assignment from Ajakus company
In this App We Can READ, ADD, EDIT(Update), DELETE users 

Features

1. User Interface
=>Displays a list of users with the following details:
ID
First Name
Last Name
Email
Department

=>Includes buttons/links for:
=>Adding a new user.
=>Editing an existing user.
=>Deleting a user.
=>A form is provided for inputting user details during addition or editing.

2. Backend Interaction
Uses JSONPlaceholder, a free online REST API.
Specifically interacts with the /users endpoint to fetch and manipulate user data.

3. Functionality
View Users: Fetches and displays all users from the /users endpoint.
Add User: Sends a POST request to /users to add a new user (simulates a successful response).
Edit User: Fetches the current user details, allows editing, and sends a PUT request to update the data.
Delete User: Sends a DELETE request to remove a user.

4. Error Handling
Handles API failures gracefully by displaying error messages to users.

5. Steps

Clone the repository:
=>git clone <repo-url>

Install dependencies:
=>npm install
# or
=>yarn install

Start the development server:
=>npm start
# or
=>yarn start

6. Project Structure
src{
  components{
    user{
      user.jsx
      user.css
    }
    userDetails{
      userDetails.jsx
      userDetails.css
    }
}
