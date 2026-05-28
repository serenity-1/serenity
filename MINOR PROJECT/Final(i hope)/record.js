// Import PocketBase library
import PocketBase from './node_modules/pocketbase/dist/pocketbase.es.mjs';

// Initialize PocketBase client with your PocketBase instance URL
const pb = new PocketBase('https://serenity-foundation.pockethost.io'); // Update with your instance URL

// Function to handle form submission
async function submitRecordRequest(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    const resident_name = document.getElementById('resident-name').value;
    const resident_id = document.getElementById('resident-id').value;
    const record_type = document.getElementById('record-type').value;
    const requester_name = document.getElementById('requester-name').value;
    const requester_email = document.getElementById('requester-email').value;
    const requester_phone = document.getElementById('requester-phone').value;
    const additional_info = document.getElementById('additional-info').value;

    // Prepare the data object
    const recordData = {
        resident_name: resident_name,
        resident_id: resident_id,
        record_type: record_type,
        requester_name: requester_name,
        requester_email: requester_email,
        requester_phone: requester_phone,
        additional_info: additional_info
    };

    try {
        // Insert data into the 'recordrequest' collection
        const record = await pb.collection('recordrequest').create(recordData);
        
        console.log('Data inserted successfully!', record);
        
        // Redirect to payment page on successful submission
        window.location.href = 'payment.html';
    } catch (error) {
        console.error('Error inserting data:', error);
        alert('An error occurred while submitting the form: ' + error.message);
    }
}

// Attach the submit event listener to the form
document.getElementById('record-request-form').addEventListener('submit', submitRecordRequest);
