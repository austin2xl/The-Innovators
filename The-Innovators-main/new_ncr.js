// Function to handle form submission
document.getElementById("ncrForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Capture form data
    const ncrData = {
        ncrNumber: document.getElementById("ncr-number").value,
        supplierName: document.getElementById("supplier-name").value,
        productName: document.getElementById("product-name").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        createdDate: document.getElementById("created-date").value,
        lastModifiedDate: document.getElementById("last-modified-date").value,
        attachments: Array.from(document.getElementById("attachments").files).map(file => file.name)
    };

    // Validate form data
    if (!ncrData.supplierName || !ncrData.productName || !ncrData.description || !ncrData.priority || !ncrData.status || !ncrData.createdDate) {
        document.getElementById("formMessage").textContent = "Please fill in all required fields.";
        document.getElementById("formMessage").style.color = "red";
        return;
    }

    // Process form data (e.g., store in a database or send to a server)
    // For demonstration, we'll log the data and show a confirmation message
    console.log("NCR Data Submitted:", ncrData);
    document.getElementById("formMessage").textContent = "NCR submitted successfully!";
    document.getElementById("formMessage").style.color = "green";

    // Clear the form fields (optional)
    document.getElementById("ncrForm").reset();
});
// Function to fetch data from the JSON file and populate the dropdown

// Optional: handle the "Save" button if you want to temporarily store data without submitting
function saveNCR() {
    const ncrData = {
        ncrNumber: document.getElementById("ncr-number").value,
        supplierName: document.getElementById("supplier-name").value,
        productName: document.getElementById("product-name").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        createdDate: document.getElementById("created-date").value,
        lastModifiedDate: document.getElementById("last-modified-date").value,
        attachments: Array.from(document.getElementById("attachments").files).map(file => file.name)
    };

    console.log("NCR Data Saved:", ncrData); // You could save to localStorage or perform other actions
    document.getElementById("formMessage").textContent = "NCR saved locally!";
    document.getElementById("formMessage").style.color = "blue";
}
// Maximum file size in bytes (e.g., 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "video/mp4", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

// Function to handle form submission with file validation
document.getElementById("ncrForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Capture form data
    const ncrData = {
        ncrNumber: document.getElementById("ncr-number").value,
        supplierName: document.getElementById("supplier-name").value,
        productName: document.getElementById("product-name").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        createdDate: document.getElementById("created-date").value,
        lastModifiedDate: document.getElementById("last-modified-date").value,
        attachments: Array.from(document.getElementById("attachments").files)
    };

    // Validate form data
    if (!ncrData.supplierName || !ncrData.productName || !ncrData.description || !ncrData.priority || !ncrData.status || !ncrData.createdDate) {
        document.getElementById("formMessage").textContent = "Please fill in all required fields.";
        document.getElementById("formMessage").style.color = "red";
        return;
    }

    // Validate attachments
    let validFiles = true;
    ncrData.attachments.forEach(file => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            document.getElementById("formMessage").textContent = `Invalid file type: ${file.name}. Allowed types are: jpg, jpeg, png, mp4, pdf, docx.`;
            document.getElementById("formMessage").style.color = "red";
            validFiles = false;
        } else if (file.size > MAX_FILE_SIZE) {
            document.getElementById("formMessage").textContent = `File too large: ${file.name}. Maximum allowed size is 5MB.`;
            document.getElementById("formMessage").style.color = "red";
            validFiles = false;
        }
    });

    if (!validFiles) return; // Stop submission if file validation fails

    // Process form data (e.g., store in a database or send to a server)
    // For demonstration, we'll log the data and show a confirmation message
    console.log("NCR Data Submitted:", {
        ...ncrData,
        attachments: ncrData.attachments.map(file => file.name) // Just log file names for simplicity
    });
    document.getElementById("formMessage").textContent = "NCR submitted successfully!";
    document.getElementById("formMessage").style.color = "green";

    // Clear the form fields (optional)
    document.getElementById("ncrForm").reset();
});

// Optional: handle the "Save" button if you want to temporarily store data without submitting
function saveNCR() {
    const ncrData = {
        ncrNumber: document.getElementById("ncr-number").value,
        supplierName: document.getElementById("supplier-name").value,
        productName: document.getElementById("product-name").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        createdDate: document.getElementById("created-date").value,
        lastModifiedDate: document.getElementById("last-modified-date").value,
        attachments: Array.from(document.getElementById("attachments").files).map(file => file.name)
    };

    console.log("NCR Data Saved:", ncrData); // You could save to localStorage or perform other actions
    document.getElementById("formMessage").textContent = "NCR saved locally!";
    document.getElementById("formMessage").style.color = "blue";
}
// Function to generate a unique NCR number
function generateNCRNumber() {
    const currentYear = new Date().getFullYear();
    const sequence = Math.floor(Math.random() * 10000) + 1; // Random number from 1 to 9999
    const ncrNumber = `${currentYear}-${sequence.toString().padStart(4, '0')}`; // Format as "2024-0001"
    return ncrNumber;
}

// Function to initialize the form with an automatic NCR number
function initializeNCRForm() {
    // Automatically populate the NCR number field
    document.getElementById("ncr-number").value = generateNCRNumber();
}



// Handle form submission (as previously coded)
document.getElementById("ncrForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Capture form data
    const ncrData = {
        ncrNumber: document.getElementById("ncr-number").value,
        supplierName: document.getElementById("supplier-name").value,
        productName: document.getElementById("product-name").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        createdDate: document.getElementById("created-date").value,
        lastModifiedDate: document.getElementById("last-modified-date").value,
        attachments: Array.from(document.getElementById("attachments").files).map(file => file.name)
    };

    // Validate and process form data (as previously coded)
    console.log("NCR Data Submitted:", ncrData);
    document.getElementById("formMessage").textContent = "NCR submitted successfully!";
    document.getElementById("formMessage").style.color = "green";

    // Reset the form and generate a new NCR number
    document.getElementById("ncrForm").reset();
    initializeNCRForm();
});

function submitNCR() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get form values
    const ncrNumber = document.getElementById('ncr-number').value;
    const supplierName = document.getElementById('supplier-name').value;
    const productName = document.getElementById('product-name').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
    const createdDate = document.getElementById('created-date').value;
    const lastModifiedDate = document.getElementById('last-modified-date').value;

    // Add content to the PDF
    doc.setFontSize(14);
    doc.text("Non-Conformance Report (NCR)", 10, 10);
    doc.setFontSize(12);
    doc.text(`NCR Number: ${ncrNumber}`, 10, 20);
    doc.text(`Supplier Name: ${supplierName}`, 10, 30);
    doc.text(`Product Name: ${productName}`, 10, 40);
    doc.text(`Description: ${description}`, 10, 50);
    doc.text(`Priority: ${priority}`, 10, 60);
    doc.text(`Status: ${status}`, 10, 70);
    doc.text(`Created Date: ${createdDate}`, 10, 80);
    doc.text(`Last Modified Date: ${lastModifiedDate}`, 10, 90);

    // Save the PDF
    doc.save(`NCR_${ncrNumber}.pdf`);
}
    // Function to fetch data from the JSON file and populate the dropdown
    function loadSupplierNames() {
        fetch('data.json') // Ensure the path to your JSON file is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Extract unique supplier names from the NCR data
                const suppliers = [...new Set(data.NCR.map(ncr => ncr.SupplierName))];
    
                // Populate the supplier dropdown
                const supplierDropdown = document.getElementById('supplier-name');
                suppliers.forEach(supplier => {
                    const option = document.createElement('option');
                    option.value = supplier;
                    option.textContent = supplier;
                    supplierDropdown.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error loading supplier names:', error);
            });
    }
    
    // Load the supplier names when the page content is fully loaded
    document.addEventListener('DOMContentLoaded', loadSupplierNames);
// Call the initialize function when the page loads
window.onload = initializeNCRForm;