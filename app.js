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

// Access control for protected pages (e.g., admin or client pages)
(function checkAccess() {
    const role = localStorage.getItem('role');

    // Define admin and client page paths
    const adminPages = ['admin.html', 'admin_create.html', 'admin_report.html', 'admintools.html', 'admin_logout.html'];
    const clientPages = ['client.html', 'client_create.html', 'client_report.html', 'client_help.html', 'client_logout.html'];

    // Get the current page path
    const currentPage = window.location.pathname.split('/').pop();

    if (!role) {
        // Redirect to login if no role is found
        window.location.href = 'index.html';
    } else if (role === 'client' && adminPages.includes(currentPage)) {
        // Redirect clients trying to access admin pages
        alert("Access denied: Clients cannot access the admin dashboard");
        window.location.href = 'client.html';
    } else if (role === 'admin' && clientPages.includes(currentPage)) {
        // Redirect admins trying to access client pages
        alert("Access denied: Admins cannot access the client dashboard");
        window.location.href = 'admin.html';
    }
})();
(function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    const role = sessionStorage.getItem('role');
    const currentPage = window.location.pathname.split('/').pop();

    if (!isLoggedIn) {
        alert("Please log in to access this page.");
        window.location.href = 'index.html';
    } else if (role === 'client' && currentPage.startsWith('admin')) {
        alert("Access denied: Clients cannot access admin pages.");
        window.location.href = 'client.html';
    } else if (role === 'admin' && currentPage.startsWith('client')) {
        alert("Access denied: Admins cannot access client pages.");
        window.location.href = 'admin.html';
    }
})();
