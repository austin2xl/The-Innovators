document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("search-bar");
    const statusFilter = document.getElementById("status-filter");
    const ncrTableBody = document.getElementById("ncr-table-body");
    const newNcrButton = document.getElementById("new-ncr-button");


    const ncrs = [
        { number: "2024-001", supplier: "Supplier A", product: "Product X", status: "open", date: "01/15/2024" },
        { number: "2024-002", supplier: "Supplier B", product: "Product Y", status: "closed", date: "02/20/2024" },
   
    ];
 
    // Function to display NCRs in the table
    function displayNCRs(filteredNCRs) {
        ncrTableBody.innerHTML = ""; // Clear existing rows
        filteredNCRs.forEach(ncr => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${ncr.number}</td>
                <td>${ncr.supplier}</td>
                <td>${ncr.product}</td>
                <td>${ncr.status}</td>
                <td>${ncr.date}</td>
                <td>
                    <button onclick="viewNCR('${ncr.number}')">View</button>
                    <button onclick="editNCR('${ncr.number}')">Edit</button>
                </td>
            `;
            ncrTableBody.appendChild(row);
        });
    }


    displayNCRs(ncrs);

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
        const filteredNCRs = status === "all" ? ncrs : ncrs.filter(ncr => ncr.status === status);
        displayNCRs(filteredNCRs);
    });

   
    newNcrButton.addEventListener("click", function() {
        window.location.href = "new.html"; // Redirect to the new NCR page
    });
});



