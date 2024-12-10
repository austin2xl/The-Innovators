// Fetch NCR data from the JSON file
async function fetchNCRData() {
    try {
        const response = await fetch('data.json'); // Ensure this file is in the correct directory
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.NCR.filter(
            ncr =>
                (ncr.Status === "In Progress" || ncr.Status === "Open") &&
                (ncr.QualityReview === "Pending" || ncr.QualityReview === "Incomplete")
        );
    } catch (error) {
        console.error('Error fetching NCR data:', error);
        return [];
    }
}

// Populate the NCR dropdown
async function populateNCRDropdown() {
    const ncrDropdown = document.getElementById("ncr-number");
    ncrDropdown.innerHTML = '<option value="">Select an NCR</option>'; // Reset dropdown

    const ncrs = await fetchNCRData();

    ncrs.forEach(ncr => {
        const option = document.createElement("option");
        option.value = ncr.NCRNumber;
        option.textContent = `${ncr.NCRNumber} - ${ncr.Description}`;
        ncrDropdown.appendChild(option);
    });
}

// Load NCR details into the form
function loadNCRDetails(ncrNumber, ncrs) {
    const selectedNCR = ncrs.find(ncr => ncr.NCRNumber === ncrNumber);

    if (!selectedNCR) {
        document.getElementById("description").value = "";
        document.getElementById("status").value = "";
        document.getElementById("priority").value = "";
        return;
    }

    document.getElementById("description").value = selectedNCR.Description;
    document.getElementById("status").value = selectedNCR.Status;
    document.getElementById("priority").value = selectedNCR.Priority;
    document.getElementById("quality-notes").value = selectedNCR.QualityReview;
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const ncrNumber = document.getElementById("ncr-number").value;
    const updatedStatus = document.getElementById("status").value;
    const updatedPriority = document.getElementById("priority").value;
    const qualityNotes = document.getElementById("quality-notes").value.trim();

    if (!ncrNumber || !qualityNotes) {
        alert("Please select an NCR and provide Quality Inspector Notes.");
        return;
    }

    const ncrs = await fetchNCRData();
    const selectedNCR = ncrs.find(ncr => ncr.NCRNumber === ncrNumber);

    if (selectedNCR) {
        selectedNCR.Status = updatedStatus;
        selectedNCR.Priority = updatedPriority;
        selectedNCR.QualityReview = "Completed";
        selectedNCR.QualityNotes = qualityNotes;

        // Simulate backend update
        await updateJSON(selectedNCR);

        // Simulate notification creation
        const notification = {
            message: `NCR ${ncrNumber} has been updated by Quality Inspector and requires purchasing review.`,
            ncrNumber,
            timestamp: new Date().toISOString(),
        };

        alert("NCR updated successfully. Notification sent to Purchasing.");
        console.log("Updated NCR Data:", selectedNCR);
        console.log("Notification:", notification);
    } else {
        alert("NCR not found.");
    }
}

// Simulate backend JSON update
async function updateJSON(updatedNCR) {
    console.log("Simulating JSON update...");
    console.log("Updated NCR for backend:", updatedNCR);

    // Backend API call placeholder:
    // await fetch('backend-api-url', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(updatedNCR)
    // });

    // Simulate success response
    return new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
}

// Initialize the page
async function init() {
    const ncrs = await fetchNCRData();
    await populateNCRDropdown();

    document.getElementById("ncr-number").addEventListener("change", event => {
        loadNCRDetails(event.target.value, ncrs);
    });

    document.getElementById("ncr-form").addEventListener("submit", handleFormSubmit);
}

// Run initialization
init();
