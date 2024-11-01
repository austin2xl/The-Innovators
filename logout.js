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
        

        // Redirect to login page
        window.location.href = "index.html";
    } else {
        // If the user cancels, simply return and do nothing
        return;
    }
}