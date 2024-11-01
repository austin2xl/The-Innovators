document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector("header");
    const navBar = document.querySelector(".nav-bar");
    const navLinks = document.querySelectorAll(".nav-bar ul li a.option");

    // Function to set the active class based on the current URL
    function setActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath.split("/").pop()) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Toggle navigation bar on hamburger click
    hamburger.addEventListener("click", function () {
        header.classList.toggle("active");
        navBar.classList.toggle("active");
    });

    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
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
        const response = await fetch("data.json");
        const data = await response.json();
        users = data.Users; // Store the users from the JSON file
    } catch (error) {
        console.error("Error loading JSON data:", error);
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
["click", "mousemove", "keypress", "scroll", "touchstart"].forEach(event => {
    document.addEventListener(event, resetSessionTimeout);
});

// Login function
async function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const formMessage = document.getElementById("formMessage");

    // Wait for users data to load if necessary
    if (users.length === 0) {
        await loadUserData();
    }

    // Find the user in your users list
    const user = users.find(u => u.Username == username && u.Password == password);

    if (user) {
        // Set login status and role in session storage
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("role", user.Role);
        sessionStorage.setItem("username", user.Username);
        

        formMessage.textContent = "Login successful!";
        formMessage.style.color = "green";

        // Start the session timeout countdown
        startSessionTimeout();

        // Redirect based on role
        window.location.href = user.Role === "admin" ? "admin.html" : "client.html";
    } else {
        formMessage.textContent = "Invalid username or password";
        formMessage.style.color = "red";
    }
}

// Attach the login function to the form submission
document.getElementById("loginForm").addEventListener("submit", login);

// Consolidated access control function for protected pages
(function checkAccess() {
    const isLoggedIn = sessionStorage.getItem("loggedIn");
    const role = sessionStorage.getItem("role");
    const currentPage = window.location.pathname.split("/").pop();

    // Define protected pages for each role
    const adminPages = ["admin.html", "admin_create.html", "admin_report.html", "admintools.html", "admin_logout.html"];
    const clientPages = ["client.html", "client_create.html", "client_report.html", "client_help.html", "client_logout.html"];
    const isLoginPage = currentPage == "index.html"; // Adjust if your login page has a different name

    if (!isLoggedIn && !isLoginPage) {
        // Redirect to login if not logged in and trying to access a protected page
        alert("Please log in to access this page.");
        window.location.href = "index.html";
    } else if (isLoggedIn && isLoginPage) {
        // If already logged in, redirect from login page to the appropriate dashboard
        window.location.href = role === "admin" ? "admin.html" : "client.html";
    } else if (role === "client" && adminPages.includes(currentPage)) {
        // Redirect clients trying to access admin pages
        alert("Access denied: Clients cannot access the admin dashboard.");
        window.location.href = "client.html";
    } else if (role === "admin" && clientPages.includes(currentPage)) {
        // Redirect admins trying to access client pages
        alert("Access denied: Admins cannot access the client dashboard.");
        window.location.href = "admin.html";
    } else if (isLoggedIn) {
        // Start session timeout on protected pages
        startSessionTimeout();
        // Optionally display username and role if needed
       
    }
})();

// Logout function to clear session and redirect to login
function logout() {
    clearTimeout(timeoutTimer); // Clear the timeout timer
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");
    window.location.href = "index.html"; // Redirect to login page
}
