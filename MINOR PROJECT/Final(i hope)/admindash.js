// Initialize PocketBase client
const pb = new PocketBase('https://serenity-foundation.pockethost.io'); // Ensure this URL is correct

// Fetch and display data for the specified collection
async function fetchAndDisplayData(collectionName, container) {
    try {
        // Fetch records sorted by the 'created' field in descending order
        const records = await pb.collection(collectionName).getFullList(200, { sort: '-created' });
        
        // Clear previous content
        container.innerHTML = '';

        // Display data if records exist, otherwise show a message
        if (records.length > 0) {
            records.forEach((record, index) => {
                const recordElement = document.createElement('div');
                recordElement.classList.add('record-item');
                recordElement.innerHTML = formatRecord(record);
                container.appendChild(recordElement);

                // Add a horizontal line between records except for the last one
                if (index < records.length - 1) {
                    const hr = document.createElement('hr');
                    container.appendChild(hr);
                }
            });
        } else {
            container.innerHTML = '<p>No records found in this collection.</p>';
        }
    } catch (error) {
        console.error(`Error fetching data for ${collectionName}:`, error);
        container.innerHTML = `<p>Error loading data. Please try again later.</p>`;
    }
}

// Format record data as HTML
function formatRecord(record) {
    return Object.entries(record)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');
}

// Set up event listener for all buttons with class 'details-button'
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const collectionName = event.currentTarget.getAttribute('data-collection');
        const containerId = `${collectionName}-details`;
        const container = document.getElementById(containerId);
        
        // Fetch and display data for the clicked button's collection
        if (container) {
            fetchAndDisplayData(collectionName, container);
        } else {
            console.error(`Container for collection '${collectionName}' not found.`);
        }
    });
});



