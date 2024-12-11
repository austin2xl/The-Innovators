document.addEventListener('DOMContentLoaded', function() {
    const users = [
        {
            "UserID": 1,
            "Username": "admin_user",
            "Password": "admin",
            "Role": "admin",
            "Email": "admin@example.com"
        },
        {
            "UserID": 2,
            "Username": "john_doe",
            "Password": "password123",
            "Role": "engineer",
            "Email": "johndoe@example.com"
        },
        {
            "UserID": 3,
            "Username": "jane_smith",
            "Password": "password456",
            "Role": "quality inspector",
            "Email": "janesmith@example.com"
        },
        {
            "UserID": 4,
            "Username": "michael_jones",
            "Password": "password789",
            "Role": "engineer",
            "Email": "michaeljones@example.com"
        },
        {
            "UserID": 5,
            "Username": "emily_davis",
            "Password": "password321",
            "Role": "admin",
            "Email": "emilydavis@example.com"
        },
        {
            "UserID": 6,
            "Username": "chris_wilson",
            "Password": "password654",
            "Role": "quality inspector",
            "Email": "chriswilson@example.com"
        },
        {
            "UserID": 7,
            "Username": "sarah_brown",
            "Password": "password987",
            "Role": "engineer",
            "Email": "sarahbrown@example.com"
        },
        {
            "UserID": 8,
            "Username": "david_miller",
            "Password": "password111",
            "Role": "admin",
            "Email": "davidmiller@example.com"
        },
        {
            "UserID": 9,
            "Username": "laura_moore",
            "Password": "password222",
            "Role": "quality inspector",
            "Email": "lauramoore@example.com"
        },
        {
            "UserID": 10,
            "Username": "james_anderson",
            "Password": "password333",
            "Role": "engineer",
            "Email": "jamesanderson@example.com"
        }
    ];

    const roles = ['admin', 'engineer', 'quality inspector'];

    function showContent(sectionId) {
        document.querySelectorAll('.tool-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }

    function showModal() {
        const modal = document.getElementById('userModal');
        const userList = document.getElementById('userList');

        userList.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const roleCell = document.createElement('td');
            const actionCell = document.createElement('td');

            nameCell.textContent = user.Username;

            const roleSelect = document.createElement('select');
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role;
                option.textContent = role;
                if (role === user.Role) {
                    option.selected = true;
                }
                roleSelect.appendChild(option);
            });

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', function() {
                user.Role = roleSelect.value;
                saveButton.textContent = 'Saved';
                if (user.Role === 'admin') {
                    removeButton.disabled = true;
                } else {
                    removeButton.disabled = false;
                }
            });

            // Reset Save button text if roleSelect is changed
            roleSelect.addEventListener('change', function() {
                saveButton.textContent = 'Save';
            });

            roleCell.appendChild(roleSelect);
            roleCell.appendChild(saveButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.disabled = user.Role === 'admin';  // Disable remove button for admins
            removeButton.addEventListener('click', function() {
                userList.removeChild(row);
                users.splice(users.indexOf(user), 1);
            });
            actionCell.appendChild(removeButton);

            row.appendChild(nameCell);
            row.appendChild(roleCell);
            row.appendChild(actionCell);

            userList.appendChild(row);
        });

        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('userModal');
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        const modal = document.getElementById('userModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Initial content display
    showContent('userManagement');

    // Sample functions for maintenance tasks
    window.backupData = function() {
        alert("Data backup started. This may take a few minutes.");
    }

    window.clearCache = function() {
        alert("Cache cleared successfully.");
    }

    window.runDiagnostics = function() {
        alert("System diagnostics running. You will be notified once completed.");
    }

    window.showModal = showModal;
    window.closeModal = closeModal;
});
