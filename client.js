// client.js
document.addEventListener('DOMContentLoaded', () => {
    fetchSheetData();
});

// Fetch data from your server, which in turn communicates with Google Sheets
function fetchSheetData() {
    // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint where 'server.js' is hosted
    fetch('https://pat-bee.github.io/')
        .then(response => response.json())
        .then(data => {
            const itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = ''; // Clear the loading message

            // Assuming data is an array of items
            data.forEach(item => {
                const listItem = document.createElement('div');
                listItem.textContent = item; // Replace 'item' as needed based on your data structure
                itemsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('itemsList').innerHTML = 'Failed to load data.';
        });
}
