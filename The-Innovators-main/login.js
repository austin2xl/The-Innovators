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

const timeoutDuration = 15 * 60 * 1000; // 15 minutes (in milliseconds)
let timeoutTimer; // Variable to hold the timeout timer

// Function to start the session timeout
function startSessionTimeout() {
    // Clear any existing timer
    clearTimeout(timeoutTimer);

    // Set a new timer
    timeoutTimer = setTimeout(() => {
        alert("Session expired due to inactivity.");
        logout(); // Log out user on timeout
    }, timeoutDuration);
}

// Reset session timeout on user activity
function resetSessionTimeout() {
    startSessionTimeout(); // Reset the session timeout
}

['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetSessionTimeout);
});


// Adjusted login function to use fetched data
async function login(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const formMessage = document.getElementById('formMessage');

    // Wait for users data to be loaded
    if (users.length === 0) {
        await loadUserData();
    }

    // Find user matching username and password
    const user = users.find(u => u.Username == username && u.Password == password);

    if (user) {
        // Save the user's role in localStorage and redirect based on role
        localStorage.setItem('role', user.Role);
        formMessage.textContent = "Login successful!";
        formMessage.style.color = "green";

        // Start session timeout after successful login
        startSessionTimeout();

        // Redirect based on role
        if (user.Role == 'admin') {
            window.location.href = 'admin.html';
        } else if (user.Role == 'client') {
            window.location.href = 'client.html';
        }
    } else {
        // Display error message if login fails
        formMessage.textContent = "Invalid username or password";
        formMessage.style.color = "red";
    }
}

// Attach the login function to the form submission event
document.getElementById('loginForm').addEventListener('submit', login);

// Logout function to clear role from localStorage and redirect to login
// Retrieve user info from localStorage (or sessionStorage)
const userName = localStorage.getItem("userName") || "Guest";
const userRole = localStorage.getItem("userRole") || "User";


// Display user info on the page
document.getElementById("userName").textContent = userName;
document.getElementById("userRole").textContent = userRole;

// Logout function
function logout() {
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        // Clear user data from localStorage or sessionStorage
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('userRole'); // Clear the role as well
        clearTimeout(timeoutTimer); // Clear the session timeout
    
        

        // Redirect to login page
        window.location.href = "index.html";
    } else {
        // If the user cancels, simply return and do nothing
        return;
    }
}



