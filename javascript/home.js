document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("search-bar");
    const statusFilter = document.getElementById("status-filter");
    const ncrTableBody = document.getElementById("ncr-table-body");
    const newNcrButton = document.getElementById("new-ncr-button");


    const ncrs = [
        { number: "2024-001", supplier: "Supplier A", product: "Product X", status: "open", date: "01/15/2024" },
        { number: "2024-002", supplier: "Supplier B", product: "Product Y", status: "close", date: "02/20/2024" },
   
    ];
 
    // Function to display NCRs in the table
    function displayNCRs(filteredNCRs) {
        const ncrTableBody = document.querySelector("tbody"); // Ensure the target table body element is selected
        ncrTableBody.innerHTML = ""; // Clear existing rows
    
        filteredNCRs.forEach(ncr => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><span class="editable" data-field="ncrNumber">${ncr.number}</span></td>
                <td><span class="editable" data-field="supplierName">${ncr.supplier}</span></td>
                <td><span class="editable" data-field="productName">${ncr.product}</span></td>
                <td><span class="editable" data-field="status">${ncr.status}</span></td>
                <td><span class="editable" data-field="createdDate">${ncr.date}</span></td>
                <td>
                    <button class="edit-btn" onclick="editNCR('${ncr.number}')">Edit</button>
                    <button class="update-btn" style="display: none;" onclick="updateNCR('${ncr.number}')">Update</button>
                    <button class="cancel-btn" style="display: none;" onclick="cancelEdit('${ncr.number}')">Cancel</button>
                    <button class="delete-btn" onclick="deleteNCR('${ncr.number}')">Delete</button>
                </td>
            `;
            ncrTableBody.appendChild(row);
        });
    }

    // Search ncr
    searchBar.addEventListener("input", function() {
        const query = searchBar.value.toLowerCase();
        const filteredNCRs = ncrs.filter(ncr =>
            ncr.number.toLowerCase().includes(query) ||
            ncr.supplier.toLowerCase().includes(query) ||
            ncr.product.toLowerCase().includes(query)
        );
        displayNCRs(filteredNCRs);
    });

    // Filter 
    statusFilter.addEventListener("change", function() {
        const status = statusFilter.value;
        const filteredNCRs = status == "all" ? ncrs : ncrs.filter(ncr => ncr.status == status);
        displayNCRs(filteredNCRs);
    });

   
    newNcrButton.addEventListener("click", function() {
        window.location.href = "new.html"; // Redirect to the new NCR page
    });
});



