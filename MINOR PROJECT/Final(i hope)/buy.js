document.querySelector('.check-out').addEventListener('click', () => {
    // Update the value of the #total-amount element with the total amount
    document.getElementById('total-amount').value = document.getElementById('total-price').textContent;
    
    const totalAmount = document.getElementById('total-amount').value;
    localStorage.setItem('totalAmount', totalAmount);
    
    // Redirect to billing.html
    window.location.href = 'billing.html';
});

function updateProductQuantity(product, price, isIncreasing) {
    const productInput = document.getElementById(product + '-number');
    let productQuantity = productInput.value;
    
    // Update quantity based on the button click
    if (isIncreasing) {
        productQuantity = parseInt(productQuantity) + 1;
    } else if (productQuantity > 0) {
        productQuantity = parseInt(productQuantity) - 1;
    }
    
    productInput.value = productQuantity;

    // Update product total price
    const productTotal = document.getElementById(product + '-total');
    productTotal.innerText = productQuantity * price;

    calculateTotal();
}

// Get product quantity
function getInputValue(product) {
    const productInput = document.getElementById(product + '-number');
    const productQuantity = parseInt(productInput.value);
    return isNaN(productQuantity) ? 0 : productQuantity; // Default to 0 if NaN
}

// Calculate total price
function calculateTotal() {
    const phoneQuantity = getInputValue('phone');
    const caseQuantity = getInputValue('case');
    const bookQuantity = getInputValue('book');
    const dreamQuantity = getInputValue('dream');

    const phoneTotal = phoneQuantity * 5;
    const caseTotal = caseQuantity * 275;
    const bookTotal = bookQuantity * 150;
    const dreamTotal = dreamQuantity * 125;

    const subTotal = phoneTotal + caseTotal + bookTotal + dreamTotal;
    const tax = subTotal / 10;
    const totalPrice = subTotal + tax;

    // Update prices on the HTML
    document.getElementById('sub-total').innerText = subTotal;
    document.getElementById('tax-amount').innerText = tax;
    document.getElementById('total-price').innerText = totalPrice;
}

// Add event listeners for each product
document.getElementById('case-plus').addEventListener('click', function() {
    updateProductQuantity('case', 275, true);
});

document.getElementById('case-minus').addEventListener('click', function() {
    updateProductQuantity('case', 275, false);
});

document.getElementById('phone-plus').addEventListener('click', function() {
    updateProductQuantity('phone', 5, true);
});

document.getElementById('phone-minus').addEventListener('click', function() {
    updateProductQuantity('phone', 5, false);
});

document.getElementById('book-plus').addEventListener('click', function() {
    updateProductQuantity('book', 150, true);
});

document.getElementById('book-minus').addEventListener('click', function() {
    updateProductQuantity('book', 150, false);
});

document.getElementById('dream-plus').addEventListener('click', function() {
    updateProductQuantity('dream', 125, true);
});

document.getElementById('dream-minus').addEventListener('click', function() {
    updateProductQuantity('dream', 125, false);
});

// Run calculateTotal on page load to initialize values
calculateTotal();
