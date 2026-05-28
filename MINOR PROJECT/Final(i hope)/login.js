// Initialize PocketBase client
const pb = new PocketBase('https://serenity-foundation.pockethost.io');  // Replace with your PocketBase URL

// Get the login form
const form = document.getElementById('loginForm');

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form from reloading the page

    // Collect form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Attempt to authenticate the user using PocketBase's built-in method
        const authData = await pb.collection('users').authWithPassword(email, password);
        console.log('Login successful:', authData);

        // Store the email in sessionStorage
        sessionStorage.setItem("email", email);

        // Redirect to the home page on successful login
        window.location.href = 'home.html';

    } catch (error) {
        // If login fails, handle the error
        console.error('Login failed:', error);
        alert("Invalid email or password. Please try again.");
    }
});
