// Initialize PocketBase client
const pb = new PocketBase('https://serenity-foundation.pockethost.io'); // Replace with your PocketBase URL

document.addEventListener("DOMContentLoaded", function() {
  const dropdown = document.getElementById('dropdown');
  const residentDetailsContainer = document.getElementById('resident-details-container');

  // Function to display extra fields for "Support a specific resident"
  dropdown.addEventListener('change', () => {
    const selectedValue = dropdown.value;
    
    // Clear any existing fields
    residentDetailsContainer.innerHTML = '';

    if (selectedValue === 'others') {
      // Create and add a text field for the resident's name
      const nameField = document.createElement('input');
      nameField.type = 'text';
      nameField.id = 'resident-name';
      nameField.name = 'resident-name';
      nameField.placeholder = 'Enter the resident\'s name';
      nameField.required = true; // Required when 'Support a specific resident' is chosen
      residentDetailsContainer.appendChild(nameField);

      // Create and add a text field for the resident's ID (optional)
      const idField = document.createElement('input');
      idField.type = 'text';
      idField.id = 'resident-id';
      idField.name = 'resident-id';
      idField.placeholder = 'Enter the resident\'s ID (if known)';
      residentDetailsContainer.appendChild(idField);
    }
  });

  // Handle the Razorpay payment and PocketBase submission on button click
  document.getElementById('rzp-button').onclick = async function(e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pan = document.getElementById('pan').value;
    const type = dropdown.value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    let residentName = null;
    let residentId = null;
    
    if (type === 'others') {
      residentName = document.getElementById('resident-name').value;
      residentId = document.getElementById('resident-id').value;
    }

    // Data to be sent to PocketBase
    const data = {
      name: name,
      email: email,
      phone: phone,
      pan: pan,
      type: type,
      resident_name: residentName || null,
      resident_id: residentId || null,
      amount: amount,
      date: date
    };

    try {
      // Create a new record in PocketBase
      const record = await pb.collection('donations').create(data);
      console.log('Donation record created successfully:', record);

      // Now proceed with Razorpay payment after PocketBase record creation
      var apiKey = "rzp_test_W6o3G1bafo3Ylq"; // Replace with your Razorpay API key
      var razorpayAmount = amount * 100; // Razorpay expects the amount in paise
      var options = {
        "key": apiKey,
        "amount": razorpayAmount, // Amount in paise
        "currency": "INR",
        "name": "Serenity Foundation",
        "description": "Donation to Serenity Foundation",
        "image": "https://example.com/logo.png", // Your logo URL
        "handler": function(response) {
          console.log('Payment successful:', response);
          alert("Payment was successful!");
        },
        "prefill": {
          "name": name,
          "email": email,
          "contact": phone
        },
        "theme": {
          "color": "#3399cc"
        }
      };

      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating donation record or processing payment:', error);
      alert("An error occurred. Please try again.");
    }
  };
});
