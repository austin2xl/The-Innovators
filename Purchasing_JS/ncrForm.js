// Fetch NCR data from JSON file
async function fetchNCRData() {
    try {
        const response = await fetch('data.json'); // Ensure this file is in the correct location
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data; // Return the entire data object
    } catch (error) {
        console.error('Error fetching NCR data:', error);
        alert('Failed to load NCR data.');
        return null;
    }
}

// Populate the NCR dropdown
async function populateNCRDropdown() {
    const ncrDropdown = document.getElementById("ncr-number");
    ncrDropdown.innerHTML = '<option value="">Loading...</option>'; // Show loading state

    const data = await fetchNCRData();

    if (!data || !data.NCR) {
        alert("Failed to load NCR data.");
        ncrDropdown.innerHTML = '<option value="">No data available</option>';
        return;
    }

    const ncrs = data.NCR.filter(ncr => ncr.Status === "In Progress");

    if (ncrs.length === 0) {
        alert("No NCRs with status 'In Progress' found.");
        ncrDropdown.innerHTML = '<option value="">No NCRs available</option>';
        return;
    }

    ncrDropdown.innerHTML = '<option value="">Select an NCR</option>'; // Reset dropdown
    ncrs.forEach(ncr => {
        const option = document.createElement("option");
        option.value = ncr.NCRNumber;
        option.textContent = `${ncr.NCRNumber} - ${ncr.Description}`;
        ncrDropdown.appendChild(option);
    });
}

// Load NCR details into the form
async function loadNCRDetails(ncrNumber) {
    const data = await fetchNCRData();

    if (!data || !data.NCR) {
        alert("Failed to load NCR data.");
        return;
    }

    const selectedNCR = data.NCR.find(ncr => ncr.NCRNumber === ncrNumber);

    if (!selectedNCR) {
        document.getElementById("quality-input").value = "";
        document.getElementById("engineering-input").value = "";
        return;
    }

    // Populate read-only fields
    document.getElementById("quality-input").value = `Quality Notes: ${selectedNCR.QualityReview}`;
    document.getElementById("engineering-input").value = `Engineering Status: ${selectedNCR.EngineeringStatus}`;
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const ncrNumber = document.getElementById("ncr-number").value;
    const purchaseOrder = document.getElementById("purchase-order").value;
    const supplierFeedback = document.getElementById("supplier-feedback").value.trim();
    const finalApproval = document.getElementById("final-approvals").value;

    if (!ncrNumber || !purchaseOrder || !supplierFeedback || !finalApproval) {
        alert("All fields are required.");
        return;
    }

    const data = await fetchNCRData();
    if (!data) return;

    const selectedNCR = data.NCR.find(ncr => ncr.NCRNumber === ncrNumber);
    if (!selectedNCR) {
        alert("NCR not found.");
        return;
    }

    // Update the selected NCR
    selectedNCR.Status = "Closed";
    selectedNCR.PurchasingStatus = "Completed";
    selectedNCR.PurchaseOrderNumber = purchaseOrder;
    selectedNCR.SupplierFeedback = supplierFeedback;
    selectedNCR.FinalApproval = finalApproval;

    // Simulate notification creation
    data.Notifications.push({
        NotificationID: data.Notifications.length + 1,
        UserID: 5, // Assuming UserID 5 is Quality
        Message: `NCR ${ncrNumber} has been closed and finalized by Purchasing.`,
        NCRID: selectedNCR.NCRID,
        Status: "Unread",
        CreatedDate: new Date().toISOString(),
    });

    alert(`NCR ${ncrNumber} has been successfully closed.`);
    console.log("Updated NCR Data:", selectedNCR);
    console.log("Updated Notifications:", data.Notifications);

    // Generate the PDF with all details
    generatePDF(selectedNCR);
}

// Generate PDF using jsPDF
function generatePDF(ncrData) {
    const { jsPDF } = window.jspdf;

    // Initialize jsPDF
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Non-Conformance Report (NCR)", 105, 20, null, null, "center");

    // Add Date and Time
    const date = new Date();
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${date.toLocaleString()}`, 105, 30, null, null, "center");

    // Add NCR Details
    let startY = 40;

    doc.setFont("helvetica", "bold");
    doc.text("NCR Details:", 10, startY);
    startY += 10;

    doc.setFont("helvetica", "normal");
    doc.text(`NCR Number: ${ncrData.NCRNumber}`, 10, startY);
    startY += 10;
    doc.text(`Description: ${ncrData.Description}`, 10, startY);
    startY += 10;
    doc.text(`Status: ${ncrData.Status}`, 10, startY);
    startY += 10;
    doc.text(`Priority: ${ncrData.Priority}`, 10, startY);
    startY += 10;
    doc.text(`Supplier Name: ${ncrData.SupplierName}`, 10, startY);
    startY += 10;
    doc.text(`Product Name: ${ncrData.ProductName}`, 10, startY);
    startY += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Quality Review:", 10, startY);
    startY += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Quality Notes: ${ncrData.QualityReview}`, 10, startY);
    startY += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Engineering Review:", 10, startY);
    startY += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Engineering Status: ${ncrData.EngineeringStatus}`, 10, startY);
    startY += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Purchasing Information:", 10, startY);
    startY += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Purchase Order Number: ${ncrData.PurchaseOrderNumber || "Not Provided"}`, 10, startY);
    startY += 10;
    doc.text(`Supplier Feedback: ${ncrData.SupplierFeedback || "Not Provided"}`, 10, startY);
    startY += 10;
    doc.text(`Final Approval: ${ncrData.FinalApproval || "Pending"}`, 10, startY);

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Generated by Purchasing System", 105, 280, null, null, "center");

    // Save PDF
    doc.save(`NCR_${ncrData.NCRNumber}.pdf`);
}

// Initialize the page
async function init() {
    await populateNCRDropdown();

    document.getElementById("ncr-number").addEventListener("change", event => {
        loadNCRDetails(event.target.value);
    });

    document.getElementById("ncr-form").addEventListener("submit", handleFormSubmit);
}

// Run initialization
init();
