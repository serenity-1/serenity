// Import PocketBase
import PocketBase from './node_modules/pocketbase/dist/pocketbase.es.mjs';
const pb = new PocketBase('https://serenity-foundation.pockethost.io'); // Change this to your PocketBase instance

// Function to handle form submission
async function bookAppointment(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const type = document.getElementById('dropdown').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Create appointment data object
    const appointmentData = {
        name: name,
        type: type,
        date: date,
        time: time
    };

    try {
        // Insert data into the 'appointments' collection
        const record = await pb.collection('appointment').create(appointmentData);
        console.log('Appointment booked successfully!', record);
        // Redirect to successful page
        window.location.href = 'successful.html';
    } catch (error) {
        console.error('Booking failed:', error);
        alert('Booking failed: ' + error.message);
    }
}

// Attach the event listener to the form
document.getElementById('appointmentForm').addEventListener('submit', bookAppointment);
