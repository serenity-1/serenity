
// Initialize PocketBase with your URL
const pb = new PocketBase('https://serenity-foundation.pockethost.io');

// Validate password confirmation and password strength
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    var username = document.getElementById('uname').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phno').value;
    var address = document.getElementById('address').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Check if password meets the strength requirements
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password should be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one digit, and one special character');
        return;
    }

    // Create a new user in PocketBase
    try {
        const userData = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": confirmPassword,
            "name": name,
            "address": address,
            "number": phoneNumber
        };
        const record = await pb.collection('users').create(userData);
        alert('User created successfully! Redirecting to login...');
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
