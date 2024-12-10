// Fetch JSON data from the file
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        ncrs = data.NCR; // Store the NCRs from the JSON file
        displayNCRs(ncrs); // Display the NCRs in the table after loading
        applyStatusFilter(ncrs)
        updateMetrics(data);
        createStatusChart(data);
        populateRecentActivities(data);
        
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}
// Update metrics
function updateMetrics(data) {
    const ncrs = data.NCR;
    document.getElementById('totalNCRs').textContent = ncrs.length;
    document.getElementById('openNCRs').textContent = 
        ncrs.filter(ncr => ncr.Status == 'Open').length;
    document.getElementById('criticalNCRs').textContent = 
        ncrs.filter(ncr => ncr.Priority == 'High').length;
    document.getElementById('resolvedToday').textContent = 
        ncrs.filter(ncr => ncr.Status == 'Closed' && 
        new Date(ncr.ClosedDate).toDateString() == new Date().toDateString()).length;
}

// Create status distribution chart
function createStatusChart(data) {
    const statusCounts = {
        Open: 0,
        'In Progress': 0,
        Closed: 0
    };
    
    data.NCR.forEach(ncr => {
        statusCounts[ncr.Status]++;
    });

    const ctx = document.getElementById('statusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ['#dc3545', '#ffc107', '#28a745']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
// Function to open a modal with NCR details
// View NCR details
function viewNCRDetails(ncrID) {
    const selectedNCR = ncrs.find(ncr => ncr.NCRID == ncrID);

    if (!selectedNCR) {
        alert("NCR not found.");
        return;
    }

    // Store selected NCR in sessionStorage
    sessionStorage.setItem("selectedNCR", JSON.stringify(selectedNCR));

    // Redirect to admin_view.html
    window.location.href = "admin_view.html";
}

// Function to close the modal
function closeModal() {
    document.getElementById('ncrModal').style.display = 'none';
}
// Populate recent activities
function populateRecentActivities(data) {
    const activitiesContainer = document.getElementById('recentActivities');
    const activities = data.NCR_Log.sort((a, b) => 
        new Date(b.ActionDate) - new Date(a.ActionDate));

    activities.slice(0, 5).forEach(activity => {
        const user = data.Users.find(user => user.UserID === activity.ActionBy);
        const ncr = data.NCR.find(ncr => ncr.NCRID === activity.NCRID);
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.innerHTML = `
        <strong>${user ? user.Username : 'Unknown User'}</strong> ${activity.Action} on NCR #${ncr ? ncr.NCRNumber : 'Unknown NCR'} 
        <span class="activity-date">${new Date(activity.ActionDate).toLocaleString()}</span>
        `;
        activitiesContainer.appendChild(activityElement);
    });
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
                <button class="view-btn" data-id="${ncr.NCRID}" >View</button>
            </td>
        `;
        row.querySelector(".view-btn").addEventListener("click", () => viewNCRDetails(ncr.NCRID));
        ncrTableBody.appendChild(row);
    });

    // Add event listeners to dynamically created buttons after rows are rendered
    addRowEventListeners();
}

// Function to add event listeners to edit, update, cancel, and delete buttons
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

    
}

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
    row.querySelector(".view-btn").style.display = isEditing ? "none" : "inline-block";
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
            // Restore the original value stored in 'data-original'
            span.textContent = input.getAttribute("data-original");
        }
    });
}


document.getElementById("status-filter").addEventListener("change", applyStatusFilter);

// Call the loadData function when the page loads
window.onload = loadData;
