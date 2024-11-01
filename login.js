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
function logout() {
    localStorage.removeItem('role');
    window.location.href = 'index.html';
}

// Access control for protected pages (e.g., admin or client pages)
(function checkAccess() {
    const role = localStorage.getItem('role');
    const isAdminPage = window.location.pathname.includes('admin.html');
    const isClientPage = window.location.pathname.includes('client.html');

    if (!role) {
        // Redirect to login if no role is found
        window.location.href = 'index.html';
    } else if (role === 'client' && isAdminPage) {
        alert("Access denied: Clients cannot access the admin dashboard");
        window.location.href = 'client.html';
    } else if (role === 'admin' && isClientPage) {
        alert("Access denied: Admins cannot access the client dashboard");
        window.location.href = 'admin.html';
    }
})();
