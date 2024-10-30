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

// Sample JavaScript for filtering by status
document.getElementById("status-filter").addEventListener("change", function() {
    const status = this.value;
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
        const ncrStatus = row.cells[3].innerText.toLowerCase();
        if (status === "all" || ncrStatus === status) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

document.body.classList.add("normal-contrast");
