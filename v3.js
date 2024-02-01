// Constants for API
const sheetId = '1-TdvQwTA8ty646DtkTkdL-_9F2fdpp7MvYhYmZZRiHQ'; // Your actual Sheet ID
const range = 'Sheet1!A:C'; // Adjusted to include the new "checked" column

// Function to fetch sheet data
function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`;
    // Assuming you're using OAuth2 for authorization, ensure the fetch includes credentials
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`, // accessToken obtained through OAuth2 flow
        }
    })
    .then(response => response.json())
    .then(data => {
        // Processing data as before
    })
    .catch(error => console.error('Error fetching data: ', error));
}

// Function to update the sheet when a checkbox is changed
function updateSheet(row, checked) {
    const values = [
        ["", "", checked ? "checked" : ""]
    ]; // Assuming you want to mark the row as "checked" in Column C
    const body = {
        values: values
    };
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A${row}:C${row}?valueInputOption=RAW`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sheet updated', data);
    })
    .catch(error => console.error('Error updating sheet: ', error));
}

function handleCheckboxChange(index, checked) {
    updateSheet(index + 1, checked); // +1 because sheet rows are 1-indexed
}

// Add checkboxes and event listeners similar to the previous example,
// but the event handler should call `handleCheckboxChange`
