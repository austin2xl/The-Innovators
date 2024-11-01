let ncrs = []; // Array to store NCRs loaded from JSON

// Fetch JSON data from the file
async function loadData() {
    try {
        const response = await fetch('data.json'); // Assuming the file is in the same directory
        const data = await response.json();
        ncrs = data.NCR; // Store the NCRs from the JSON file
        displayNCRs(ncrs); // Display the NCRs in the table after loading
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Function to display NCRs in the table
function displayNCRs(filteredNCRs) {
    const ncrTableBody = document.getElementById("ncrTableBody");
    ncrTableBody.innerHTML = ""; // Clear existing rows

    filteredNCRs.forEach(ncr => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><span class="editable" data-field="ncrNumber">${ncr.NCRNumber}</span></td>
            <td><span class="editable" data-field="supplier">${ncr.SupplierName}</span></td>
            <td><span class="editable" data-field="product">${ncr.ProductName}</span></td>
            <td><span class="editable" data-field="status">${ncr.Status}</span></td>
            <td><span class="editable" data-field="createdDate">${ncr.CreatedDate}</span></td>
            <td>
                <button class="edit-btn" onclick="toggleEditMode(this.closest('tr'), true)">Edit</button>
                <button class="cancel-btn" style="display: none;" onclick="toggleEditMode(this.closest('tr'), false)">Cancel</button>
                <button class="view-btn" onclick="viewDescription('${ncr.Description}')">View</button>
            </td>
        `;
        ncrTableBody.appendChild(row);
    });
}

// Toggle between edit and view modes
function toggleEditMode(row, isEditing) {
    row.querySelectorAll(".editable").forEach(span => {
        const fieldValue = span.textContent;
        if (isEditing) {
            // Replace text content with an input field for editing
            span.innerHTML = `<input type="text" value="${fieldValue}" data-original="${fieldValue}" />`;
        } else {
            // Restore the original or edited value when exiting edit mode
            const input = span.querySelector("input");
            if (input) {
                span.textContent = input.getAttribute("data-original"); // Restore original value on cancel
            }
        }
    });

    // Toggle visibility of the "Edit" and "Cancel" buttons
    row.querySelector(".edit-btn").style.display = isEditing ? "none" : "inline-block";
    row.querySelector(".cancel-btn").style.display = isEditing ? "inline-block" : "none";
    row.querySelector(".view-btn").style.display = isEditing ? "none" : "inline-block";
}

// Function to show NCR description in modal
function viewDescription(ncr) {
    document.getElementById("modal-ncr-number").innerText = ncr.NCRNumber;
    document.getElementById("modal-supplier-name").innerText = ncr.SupplierName;
    document.getElementById("modal-product-name").innerText = ncr.ProductName;
    document.getElementById("modal-status").innerText = ncr.Status;
    document.getElementById("modal-created-date").innerText = ncr.CreatedDate;
    document.getElementById("modal-description").innerText = ncr.Description;
    document.getElementById("ncrModal").style.display = "block";
}

// Update displayNCRs function to call viewDescription with the full NCR object
function displayNCRs(filteredNCRs) {
    const ncrTableBody = document.getElementById("ncrTableBody");
    ncrTableBody.innerHTML = ""; // Clear existing rows

    filteredNCRs.forEach(ncr => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><span class="editable" data-field="ncrNumber">${ncr.NCRNumber}</span></td>
            <td><span class="editable" data-field="supplier">${ncr.SupplierName}</span></td>
            <td><span class="editable" data-field="product">${ncr.ProductName}</span></td>
            <td><span class="editable" data-field="status">${ncr.Status}</span></td>
            <td><span class="editable" data-field="createdDate">${ncr.CreatedDate}</span></td>
            <td>
                <button class="edit-btn" onclick="toggleEditMode(this.closest('tr'), true)">Edit</button>
                <button class="cancel-btn" style="display: none;" onclick="toggleEditMode(this.closest('tr'), false)">Cancel</button>
                <button class="view-btn" onclick='viewDescription(${JSON.stringify(ncr)})'>View</button>
            </td>
        `;
        ncrTableBody.appendChild(row);
    });
}

// Function to close modal
function closeModal() {
    document.getElementById("ncrModal").style.display = "none";
}

// Search function to filter NCRs based on search input
function searchNCRs() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredNCRs = ncrs.filter(ncr => 
        ncr.NCRNumber.toLowerCase().includes(query) ||
        ncr.SupplierName.toLowerCase().includes(query) ||
        ncr.ProductName.toLowerCase().includes(query)
    );
    displayNCRs(filteredNCRs);
}

// Event listener for the search bar
document.getElementById("search-bar").addEventListener("input", searchNCRs);

// Filter NCRs by status
const statusFilter = document.getElementById("status-filter");
statusFilter.addEventListener("change", function() {
    const status = statusFilter.value;
    const filteredNCRs = status == "all" ? ncrs : ncrs.filter(ncr => ncr.Status == status);
    displayNCRs(filteredNCRs);
});


// Initialize the data load when the page loads
window.onload = loadData;
