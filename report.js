let ncrs = []; // Array to store NCRs loaded from JSON

// Fetch JSON data from the file
async function loadData() {
    try {
        const response = await fetch('data.json'); // Assuming the file is in the same directory
        const data = await response.json();
        ncrs = data.NCR; // Store the NCRs from the JSON file
        displayReportSummary(ncrs); // Display the NCRs in the summary table after loading
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Function to display NCRs in the report summary table
function displayReportSummary(ncrData) {
    const summaryTable = document.getElementById("reportSummaryTable");
    summaryTable.innerHTML = ""; // Clear existing rows

    if (ncrData.length === 0) {
        summaryTable.innerHTML = `<tr><td colspan="6" class="no-reports">No reports available.</td></tr>`;
        return;
    }

    ncrData.forEach(ncr => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${ncr.NCRID}</td>
            <td>${ncr.NCRNumber}</td>
            <td>${ncr.Status}</td>
            <td>${ncr.Priority}</td>
            <td>${ncr.CreatedDate}</td>
            <td><button class="view-details-btn" onclick="viewReportDetails(${ncr.NCRID})">View Details</button></td>
        `;
        summaryTable.appendChild(row);
    });
}

// Function to display details for a selected NCR
function viewReportDetails(ncrID) {
    const ncr = ncrs.find(n => n.NCRID == ncrID);
    const detailsTable = document.getElementById("reportDetailsTable");
    detailsTable.innerHTML = ""; // Clear existing rows

    if (!ncr) {
        detailsTable.innerHTML = `<tr><td colspan="2" class="no-reports">Report not found.</td></tr>`;
        return;
    }

    // Populate the details table with NCR properties
    for (const [field, value] of Object.entries(ncr)) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${field.charAt(0).toUpperCase() + field.slice(1)}</td><td>${value}</td>`;
        detailsTable.appendChild(row);
    }
}

// Function to apply filters and display filtered NCRs in the summary table
function applyFilters() {
    const statusFilter = document.getElementById("status-filter").value;
    const priorityFilter = document.getElementById("priority-filter").value;
    const dateFilter = document.getElementById("date-filter").value;

    const filteredNCRs = ncrs.filter(ncr => {
        const ncrDate = new Date(ncr.CreatedDate);
        const selectedDate = dateFilter ? new Date(dateFilter) : null;

        return (
            (statusFilter === "all" || ncr.Status == statusFilter) &&
            (priorityFilter === "all" || ncr.Priority == priorityFilter) &&
            (!selectedDate || ncrDate >= selectedDate)
        );
    });

    displayReportSummary(filteredNCRs);
}

// Call loadData to load NCR data and initialize the page when it loads
window.onload = loadData;
