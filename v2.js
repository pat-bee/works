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

            const checkedItems = new URLSearchParams(window.location.search).getAll('checked[]');

            items.forEach((item, index) => {
                if (!item[1] && !checkedItems.includes(index.toString())) { // Check if column B is empty and item is not checked
                    const listItem = document.createElement('div');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `checkbox-${index}`;
                    checkbox.onchange = () => handleCheckboxChange(index);

                    const label = document.createElement('label');
                    label.htmlFor = `checkbox-${index}`;
                    label.textContent = item[0]; // Column A value

                    listItem.appendChild(checkbox);
                    listItem.appendChild(label);
                    itemsList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching data: ', error));
}

function handleCheckboxChange(index) {
    const params = new URLSearchParams(window.location.search);
    params.append('checked[]', index);
    window.location.search = params.toString();
}

document.addEventListener('DOMContentLoaded', fetchSheetData);
