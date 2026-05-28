// Add event listener to nav toggle button
document.querySelector('.nav-toggle').addEventListener('click', () => {
    // Toggle nav menu
    document.querySelector('.nav').classList.toggle('show');
});

// Add event listener to cta button
document.querySelector('.cta-button').addEventListener('click', () => {
    // Add animation to progress bar
    document.querySelector('.progress-bar-fill').style.width = '50%';
});