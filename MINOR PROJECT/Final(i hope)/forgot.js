// Initialize PocketBase client with your PocketBase URL
const pb = new PocketBase('https://serenity-foundation.pockethost.io');  // Replace with your PocketBase URL

document.getElementById('forgotPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const email = document.getElementById('email').value; // Get email from input

    try {
        // Use PocketBase to request a password reset
        await pb.collection('users').requestPasswordReset(email);
        
        // Show success message
        document.getElementById('message').innerText = `A password reset link has been sent to ${email}.`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    }
});
