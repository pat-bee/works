

const sheetId = '1-TdvQwTA8ty646DtkTkdL-_9F2fdpp7MvYhYmZZRiHQ'; // Replace with your actual Sheet ID
const apiKey = 'AIzaSyCKbq9PTjpEUEnqJ2hH2EPYSpqcCsVjelI'; // Replace with your actual API key
const range = 'Sheet1!A:B'; // Adjust the range as needed

function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.values; // Array of sheet rows
            const itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = ''; // Clear existing items
            items.forEach(item => {
                if (!item[1]) { // Check if column B is empty
                    const listItem = document.createElement('div');
                    listItem.textContent = item[0]; // Column A value
                    itemsList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching data: ', error));
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchSheetData);
