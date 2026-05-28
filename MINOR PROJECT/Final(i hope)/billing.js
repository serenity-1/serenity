// Initialize PocketBase client
const pb = new PocketBase('https://serenity-foundation.pockethost.io');  // Ensure PocketBase URL is correct

// Target the pay button
const payBtn = document.getElementById('pay-btn');

payBtn.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent form submission
  
  // Retrieve values from the form
  const fullName = document.querySelector("input[placeholder='Enter full name']").value;
  const email = document.querySelector("input[placeholder='Enter Email Address']").value;
  const phone = document.querySelector("input[placeholder='Enter Phone Number']").value;
  const address1 = document.querySelector("input[placeholder='Enter the Street Address']").value;
  const address2 = document.querySelector("input[placeholder='Enter the Street Address line 2']").value;
  const country = document.querySelector("select").value;
  const city = document.querySelector("input[placeholder='Enter the city']").value;
  const region = document.querySelector("input[placeholder='Enter the region']").value;
  const postal = document.querySelector("input[placeholder='Enter postal']").value;

  // Retrieve the total amount from local storage
  const totalAmount = localStorage.getItem('totalAmount');
  
  // Data structure to send to PocketBase
  const userData = {
    full_name: fullName,
    email: email,
    phone: phone,
    address_line_1: address1,
    address_line_2: address2,
    country: country,
    city: city,
    region: region,
    postal: postal,
    amount: totalAmount,
  };

  try {
    // Send data to PocketBase collection (replace 'orders' with your actual collection name)
    await pb.collection('orders').create(userData);
    console.log('Data uploaded successfully to PocketBase');
  } catch (error) {
    console.error('Failed to upload data to PocketBase:', error);
    alert('There was an error saving your data. Please try again.');
    return; // Stop if data upload fails
  }

  // Proceed to payment if data upload was successful
  const amount = parseInt(totalAmount) * 100; // Convert to smallest unit of currency (e.g., paisa)
  
  const options = {
    key: 'rzp_test_W6o3G1bafo3Ylq', // Replace with your Razorpay key_id
    amount: amount, // Pass the total amount to Razorpay
    currency: 'INR',
    name: 'SERENITY FOUNDATION',
    description: 'Payment for your order',
    image: 'https://example.com/your_logo', // Add a valid logo URL
    handler: function (response) {
      alert('Payment successful!');

      // Optional: Call a server-side function here to verify payment status with Razorpay
    },
    prefill: {
      name: fullName,
      email: email,
      contact: phone,
    },
    notes: {
      address: `${address1}, ${address2}, ${city}, ${region}, ${postal}`,
    },
    theme: {
      color: '#528FF0',
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
});
