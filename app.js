document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector('header');
    const navBar = document.querySelector(".nav-bar");
    const navLinks = document.querySelectorAll(".nav-bar ul li a.option");

    // Function to set the active class based on the current URL
    function setActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Toggle navigation bar on hamburger click
    hamburger.addEventListener('click', function() {
        header.classList.toggle('active');
        navBar.classList.toggle("active");
       
    });

    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            navLinks.forEach(navLink => navLink.classList.remove("active"));
            this.classList.add("active");
            navBar.classList.remove("active");
        });
    });

    // Set the active link on page load
    setActiveLink();
});

let users = [];

// Fetch JSON data from the file
async function loadUserData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        users = data.Users; // Store the users from the JSON file
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Call the loadUserData function when the page loads
window.onload = loadUserData;

// Set timeout duration in milliseconds (e.g., 15 minutes)
const timeoutDuration = 15 * 60 * 1000;
let timeoutTimer;

// Function to start session timeout
function startSessionTimeout() {
    clearTimeout(timeoutTimer); // Clear any existing timer

    // Set a new timeout to trigger logout after the specified duration
    timeoutTimer = setTimeout(() => {
        alert("Session expired due to inactivity.");
        logout(); // Log the user out after the timeout
    }, timeoutDuration);
}

// Function to reset session timeout on user activity
function resetSessionTimeout() {
    startSessionTimeout(); // Reset the timer by starting a new session timeout
}

// Attach event listeners to detect user activity and reset the timeout
['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetSessionTimeout);
});

// Login function
async function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const formMessage = document.getElementById('formMessage');

    // Wait for users data to load if necessary
    if (users.length === 0) {
        await loadUserData();
    }

    // Find the user in your users list
    const user = users.find(u => u.Username == username && u.Password == password);

    if (user) {
        // Set login status and role in session storage
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('role', user.Role);
        sessionStorage.setItem('username', user.username);

        formMessage.textContent = "Login successful!";
        formMessage.style.color = "green";

        // Start the session timeout countdown
        startSessionTimeout();

        // Redirect based on role
        switch (user.Role.toLowerCase()) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'client':
                window.location.href = 'client.html';
                break;
            case 'engineer':
                window.location.href = 'engineer.html';
                break;
                case 'purchasing':
                window.location.href = 'purchasing.html';
                break;
                case 'quality':
                window.location.href = 'qualityInspector.html';
                break;
            default:
                alert("Unauthorized access. Role not recognized.");
        }
    } else {
        formMessage.textContent = "Invalid username or password";
        formMessage.style.color = "red";
    }
}

// Attach login function to the form
document.getElementById("loginForm").addEventListener("submit", login);

// Access control for protected pages
(function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    const role = sessionStorage.getItem('role');
    const currentPage = window.location.pathname.split('/').pop();
    const userName = sessionStorage.getItem('username');
    const isLoginPage = currentPage === "index.html";
   
    if (!role && !isLoginPage) {
        alert("Login to access the page")
        // Redirect to login if no role is found
        window.location.href = 'index.html';
    } else if (role == 'client' && currentPage.startsWith('admin')) {
        alert("Access denied: Clients cannot access admin pages.");
        window.location.href = 'client.html';
    } else if (role == 'admin' && currentPage.startsWith('client')) {
        alert("Access denied: Admins cannot access client pages.");
        window.location.href = 'admin.html';
    } else {
        startSessionTimeout(); // Start session timeout on protected pages
    }
})();


async function loadNotificationsByRole() {
    const mailList = document.getElementById("mailList");
    
    mailList.innerHTML = ""; // Clear existing notifications

    try {
        const response = await fetch('data.json'); // Fetch data from the JSON file
        const data = await response.json();

        if (!data.Notifications || data.Notifications.length === 0) {
            mailList.innerHTML = "<li>No notifications available.</li>";
            return;
        }

        // Get the logged-in user's role from session storage
        const userRole = sessionStorage.getItem('role');

        // Filter notifications based on role
        const roleNotifications = data.Notifications.filter(
            notification => notification.Role === userRole
        );

        if (roleNotifications.length === 0) {
            mailList.innerHTML = "<li>No notifications for your role.</li>";
            return;
        }

        // Populate the notifications
        roleNotifications.forEach(notification => {
            const notificationItem = document.createElement("li");
            notificationItem.className = `notification-item ${
                notification.Status === "Unread" ? "unread" : "read"
            }`;
            notificationItem.textContent = notification.Message;
            notificationItem.onclick = () =>
                alert(
                    `Notification: ${notification.Message}\nDate: ${new Date(
                        notification.CreatedDate
                    ).toLocaleString()}`
                );
            mailList.appendChild(notificationItem);
        });
    } catch (error) {
        console.error("Error loading notifications:", error);
        mailList.innerHTML = "<li>Error loading notifications.</li>";
    }
}

// Toggle notification dropdown visibility
function toggleMailDropdown() {
    const mailDropdown = document.getElementById("mailDropdown");
    mailDropdown.classList.toggle("show");
}

// Attach event listeners and initialize notifications
document.getElementById("bell").addEventListener("click", toggleMailDropdown);

// Load notifications on page load for the logged-in user
document.addEventListener("DOMContentLoaded", () => {
    loadNotificationsByRole();
});

async function loadNotificationsByRoleOne() {
    const mailList1 = document.getElementById("mailList-one");
  
    mailList.innerHTML = ""; // Clear existing notifications

    try {
        const response = await fetch('data.json'); // Fetch data from the JSON file
        const data = await response.json();

        if (!data.Notifications || data.Notifications.length === 0) {
            mailList1.innerHTML = "<li>No notifications available.</li>";
            return;
        }

        // Get the logged-in user's role from session storage
        const userRole = sessionStorage.getItem('role');

        // Filter notifications based on role
        const roleNotifications = data.Notifications.filter(
            notification => notification.Role === userRole
        );

        if (roleNotifications.length === 0) {
            mailList.innerHTML = "<li>No notifications for your role.</li>";
            return;
        }

        // Populate the notifications
        roleNotifications.forEach(notification => {
            const notificationItem = document.createElement("li");
            notificationItem.className = `notification-item ${
                notification.Status === "Unread" ? "unread" : "read"
            }`;
            notificationItem.textContent = notification.Message;
            notificationItem.onclick = () =>
                alert(
                    `Notification: ${notification.Message}\nDate: ${new Date(
                        notification.CreatedDate
                    ).toLocaleString()}`
                );
            mailList.appendChild(notificationItem);
        });
    } catch (error) {
        console.error("Error loading notifications:", error);
        mailList.innerHTML = "<li>Error loading notifications.</li>";
    }
}

// Toggle notification dropdown visibility
function toggleMailDropdown() {
    const mailDropdown1 = document.getElementById("mailDropdown-one");
    mailDropdown1.classList.toggle("show");
}

// Attach event listeners and initialize notifications
document.getElementById("bell").addEventListener("click", toggleMailDropdown);

// Load notifications on page load for the logged-in user
document.addEventListener("DOMContentLoaded", () => {
    loadNotificationsByRoleOne();
});


// Call loadMails on window load
window.onload = function() {
    loadMails();
};




// Logout function to clear session and redirect to login
function logout() {
    clearTimeout(timeoutTimer); // Clear the timeout timer
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('role'); // Clear the role as well
    sessionStorage.removeItem('username'); // Clear the role as well
    window.location.href = 'index.html'; // Redirect to login page
}