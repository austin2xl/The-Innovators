
window.onload = function () {
    const selectedNCR = JSON.parse(sessionStorage.getItem("selectedNCR"));

    if (!selectedNCR) {
        alert("No NCR data available.");
        return;
    }

    // Display NCR details
    document.getElementById("ncrNumber").textContent = selectedNCR.NCRNumber;
    document.getElementById("supplier").textContent = selectedNCR.SupplierName;
    document.getElementById("product").textContent = selectedNCR.ProductName;
    document.getElementById("status").textContent = selectedNCR.Status;
    document.getElementById("createdDate").textContent = selectedNCR.CreatedDate;
};
        
  