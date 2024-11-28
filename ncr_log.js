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
function clearFilters() {
    // Reset filter inputs
    document.getElementById("status-filter").value = "all";
    document.getElementById("priority-filter").value = "all";
    document.getElementById("date-filter").value = "";

    // Display all NCRs
    displayReportSummary(ncrs);
}
async function generatePDF() {
    const { jsPDF } = window.jspdf;

    // Initialize jsPDF
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("NCR Detailed Report", 105, 20, null, null, "center");

    // Add Date and Time
    const date = new Date();
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${date.toLocaleString()}`, 105, 30, null, null, "center");

    // Fetch Details from Report Details Table
    const detailsTable = document.getElementById("reportDetailsTable");
    const rows = detailsTable.querySelectorAll("tr");

    if (rows.length == 0 || rows[0].textContent.includes("Select a report")) {
        alert("No report selected. Please select a report to generate its details.");
        return;
    }

    // Extract and Add Details to PDF
    let startY = 40;
    doc.setFont("helvetica", "bold");
    doc.text("Report Details:", 10, startY);
    startY += 10;

    rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length > 0) {
            const field = cells[0].textContent;
            const value = cells[1].textContent;
            doc.setFont("helvetica", "normal");
            doc.text(`${field}: ${value}`, 10, startY);
            startY += 10; // Move to the next line
        }
    });

    // Include Report Summary if Checkbox is Checked
    const includeSummary = document.getElementById("include-summary").checked;
    if (includeSummary) {
        const summaryTable = document.getElementById("reportSummaryTable");
        const summaryRows = summaryTable.querySelectorAll("tr");

        if (summaryRows.length > 1) {
            startY += 10;
            doc.setFont("helvetica", "bold");
            doc.text("Report Summary:", 10, startY);
            startY += 10;

            // Extract Header Row
            const headers = [];
            const headerCells = summaryTable.querySelectorAll("thead th");
            headerCells.forEach((header) => {
                headers.push(header.textContent);
            });

            // Extract Data Rows
            const summaryData = [];
            summaryRows.forEach((row) => {
                const cells = row.querySelectorAll("td");
                if (cells.length > 0) {
                    const rowData = Array.from(cells).map((cell) => cell.textContent);
                    summaryData.push(rowData);
                }
            });

            // Add Summary Table to PDF
            doc.autoTable({
                head: [headers],
                body: summaryData,
                startY: startY,
                theme: "striped",
            });
        }
    }

    // Download the PDF
    doc.save("NCR_Report.pdf");
}


    

// Call loadData to load NCR data and initialize the page when it loads
window.onload = loadData;
