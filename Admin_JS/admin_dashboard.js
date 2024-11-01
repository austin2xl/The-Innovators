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
    const ncrTableBody = document.querySelector("tbody"); // Ensure the target table body element is selected
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
                <button class="edit-btn" onclick="editNCR('${ncr.NCRNumber}')">Edit</button>
                <button class="update-btn" style="display: none;" onclick="updateNCR('${ncr.NCRNumber}')">Update</button>
                <button class="cancel-btn" style="display: none;" onclick="cancelEdit('${ncr.NCRNumber}')">Cancel</button>
                <button class="delete-btn" onclick="deleteNCR('${ncr.NCRNumber}')">Delete</button>
            </td>
        `;
        ncrTableBody.appendChild(row);
    });
}

// Filter NCRs by status
const statusFilter = document.getElementById("status-filter");
statusFilter.addEventListener("change", function() {
    const status = statusFilter.value;
    const filteredNCRs = status == "all" ? ncrs : ncrs.filter(ncr => ncr.Status == status);
    displayNCRs(filteredNCRs);
});

// Call the loadUserData function when the page loads
window.onload = loadData;

    document.addEventListener("DOMContentLoaded", function () {
        // Handle Edit button click
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const row = this.closest("tr");
                toggleEditMode(row, true);
            });
        });

        // Handle Update button click
        document.querySelectorAll(".update-btn").forEach(button => {
            button.addEventListener("click", function () {
                const row = this.closest("tr");
                updateNCR(row);
                toggleEditMode(row, false);
            });
        });

        // Handle Cancel button click
        document.querySelectorAll(".cancel-btn").forEach(button => {
            button.addEventListener("click", function () {
                const row = this.closest("tr");
                cancelEdit(row);
                toggleEditMode(row, false);
            });
        });

        // Handle Delete button click
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const row = this.closest("tr");
                deleteRow(row);
            });
        });

        // Toggle between edit and view modes
        function toggleEditMode(row, isEditing) {
            row.querySelectorAll(".editable").forEach(span => {
                const fieldValue = span.textContent;
                if (isEditing) {
                    // Replace text content with an input field
                    span.innerHTML = `<input type="text" value="${fieldValue}" data-original="${fieldValue}" />`;
                } else {
                    // Restore the original value or updated value
                    const input = span.querySelector("input");
                    if (input) {
                        span.textContent = input.value;
                    }
                }
            });

            // Toggle visibility of buttons
            row.querySelector(".edit-btn").style.display = isEditing ? "none" : "inline-block";
            row.querySelector(".update-btn").style.display = isEditing ? "inline-block" : "none";
            row.querySelector(".cancel-btn").style.display = isEditing ? "inline-block" : "none";

            // Hide Delete button in edit mode
            row.querySelector(".delete-btn").style.display = isEditing ? "none" : "inline-block";
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

            alert("Updated NCR Data:", ncrData);
            // You can send the updated data to the server here via AJAX if needed
        }

        // Cancel the editing and restore original values
        function cancelEdit(row) {
            row.querySelectorAll(".editable").forEach(span => {
                const input = span.querySelector("input");
                if (input) {
                    // Restore the original value stored in 'data-original'
                    span.textContent = input.getAttribute("data-original");
                }
            });
        }

        // Delete the row from the table
        function deleteRow(row) {
            if (confirm("Are you sure you want to delete this NCR?")) {
                row.remove();
                alert("NCR deleted.");
                // You can send a delete request to the server here via AJAX if needed
            }
        }
    });