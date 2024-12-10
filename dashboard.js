// Fetch JSON data asynchronously
async function fetchNCRData() {
    try {
        const response = await fetch('data.json'); // Replace with your JSON file path
        const data = await response.json();
        return data.NCR.filter(ncr => ncr.CreatedBy == 5); // Filter NCRs for Quality Inspector
    } catch (error) {
        console.error('Error fetching NCR data:', error);
        tableBody.innerHTML = '<tr><td colspan="6">Failed to load data. Please try again later.</td></tr>';
        return [];
    }
}

// Render NCR data into the table
function renderNCRTable(ncrs) {
    const tableBody = document.querySelector('#ncr-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    if (ncrs.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="6">No NCRs match the criteria.</td>`;
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
            <td>${ncr.CreatedDate}</td>
            <td>${ncr.LastModifiedDate}</td>
        `;
        tableBody.appendChild(row);
    });
}




// Apply filters and re-render the table
async function applyFilters() {
    const ncrs = await fetchNCRData();

    const statusFilter = document.getElementById('status-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;
    const dateFilter = document.getElementById('date-filter').value;

    const filteredNCRs = ncrs.filter(ncr => {
        const matchesStatus = statusFilter == 'all' || ncr.Status == statusFilter;
        const matchesPriority = priorityFilter == 'all' || ncr.Priority == priorityFilter;
        const matchesDate = !dateFilter || ncr.CreatedDate == dateFilter;
        return matchesStatus && matchesPriority && matchesDate;
    });

    renderNCRTable(filteredNCRs);
}

// cancel filters
document.getElementById('cancel-btn').addEventListener('click', function () {
    document.getElementById('status-filter').value = 'all';
    document.getElementById('priority-filter').value = 'all';
    document.getElementById('date-filter').value = '';
    renderNCRTable(ncrs);
});


// Initialize the dashboard
async function initDashboard() {
    const ncrs = await fetchNCRData();
    renderNCRTable(ncrs);

    document.getElementById('filter-btn').addEventListener('click', applyFilters);
}

// Run the dashboard initialization
initDashboard();
