// Fetch JSON data from the file
async function loadData() {
    try {
        const response = await fetch('data.json'); // Assuming the file is in the same directory
        const data = await response.json();
        ncrs = data.NCR; // Store the NCRs from the JSON file
        displayNCRs(ncrs); // Display the NCRs in the table after loading
        applyStatusFilter(ncrs);
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Function to apply the status filter
function applyStatusFilter() {
    const status = document.getElementById("status-filter").value;
    const filteredNCRs = status == "all" ? ncrs : ncrs.filter(ncr => ncr.Status == status);
    displayNCRs(filteredNCRs);
}
// Function to display NCRs in the table
function displayNCRs(filteredNCRs) {
    const ncrTableBody = document.querySelector("tbody");
    ncrTableBody.innerHTML = '';

    filteredNCRs.forEach(ncr => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><span class="non-editable" data-field="ncrNumber">${ncr.NCRNumber}</span></td>
            <td><span class="non-editable" data-field="supplier">${ncr.SupplierName}</span></td>
            <td><span class="editable" data-field="product">${ncr.ProductName}</span></td>
            <td><span class="editable" data-field="status">${ncr.Status}</span></td>
            <td><span class="editable" data-field="createdDate">${ncr.CreatedDate}</span></td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="update-btn" style="display: none;">Update</button>
                <button class="cancel-btn" style="display: none;">Cancel</button>
                <button class="view-btn">View</button>
            </td>
        `;
        ncrTableBody.appendChild(row);
    });

    // Add event listeners to dynamically created buttons after rows are rendered
    addRowEventListeners();
}

// Function to add event listeners to edit, update, and cancel buttons
function addRowEventListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            toggleEditMode(row, true);
        });
    });

    document.querySelectorAll(".update-btn").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            updateNCR(row);
            toggleEditMode(row, false);
        });
    });

    document.querySelectorAll(".cancel-btn").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            cancelEdit(row);
            toggleEditMode(row, false);
        });
    });

    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {
            const rowIndex = Array.from(this.closest("tbody").children).indexOf(this.closest("tr"));
            viewDescription(ncrs[rowIndex]);
        });
    });
}

// Toggle between edit and view modes
function toggleEditMode(row, isEditing) {
    row.querySelectorAll(".editable").forEach(span => {
        const fieldValue = span.textContent;
        if (isEditing) {
            span.innerHTML = `<input type="text" value="${fieldValue}" data-original="${fieldValue}" />`;
        } else {
            const input = span.querySelector("input");
            if (input) {
                span.textContent = input.value;
            }
        }
    });

    row.querySelector(".edit-btn").style.display = isEditing ? "none" : "inline-block";
    row.querySelector(".view-btn").style.display = isEditing ? "none" : "inline-block";
    row.querySelector(".update-btn").style.display = isEditing ? "inline-block" : "none";
    row.querySelector(".cancel-btn").style.display = isEditing ? "inline-block" : "none";
}

// Update NCR with new values
function updateNCR(row) {
    const ncrData = {};
    row.querySelectorAll(".editable").forEach(span => {
        const input = span.querySelector("input");
        if (input) {
            const field = span.getAttribute("data-field");
            ncrData[field] = input.value;
        }
    });

    alert("Updated NCR Data:\n" + JSON.stringify(ncrData, null, 2));
}

// Cancel the editing and restore original values
function cancelEdit(row) {
    row.querySelectorAll(".editable").forEach(span => {
        const input = span.querySelector("input");
        if (input) {
            span.textContent = input.getAttribute("data-original");
        }
    });
}

// Function to show NCR details in a modal
function viewDescription(ncr) {
    document.getElementById("modal-ncr-number").innerText = ncr.NCRNumber;
    document.getElementById("modal-supplier-name").innerText = ncr.SupplierName;
    document.getElementById("modal-product-name").innerText = ncr.ProductName;
    document.getElementById("modal-status").innerText = ncr.Status;
    document.getElementById("modal-created-date").innerText = ncr.CreatedDate;
    document.getElementById("modal-description").innerText = ncr.Description;
    document.getElementById("ncrModal").style.display = "block";
}

// Function to close the modal
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

// Event listener for the search bar and status filter
document.getElementById("search-bar").addEventListener("input", searchNCRs);
document.getElementById("status-filter").addEventListener("change", applyStatusFilter);

// Initialize the data load when the page loads
window.onload = loadData;


