// Fetch NCR data from the JSON file
async function fetchNCRData() {
    try {
        const response = await fetch('data.json'); // Ensure this file is in the same directory
        const data = await response.json();
        return data.NCR.filter(ncr => ncr.PurchasingStatus == "Pending" && ncr.Status == "Open"); // Filter NCRs processed through Purchasing
    } catch (error) {
        console.error('Error fetching NCR data:', error);
        return [];
    }
}

// Render NCR data into the table
async function renderNCRTable() {
    const ncrs = await fetchNCRData();
    const tableBody = document.querySelector('#ncr-table tbody');

    tableBody.innerHTML = ''; // Clear existing rows

    if (ncrs.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="6">No processed NCRs found.</td>`;
        tableBody.appendChild(noDataRow);
        return;
    }

    ncrs.forEach(ncr => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ncr.NCRNumber}</td>
            <td>${ncr.Description}</td>
            <td>${ncr.Status}</td>
            <td>${ncr.Priority}</td>
            <td>${ncr.QualityReview}</td>
            <td>${ncr.PurchasingStatus}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize dashboard
function initDashboard() {
    renderNCRTable();
}

// Run initialization
initDashboard();
