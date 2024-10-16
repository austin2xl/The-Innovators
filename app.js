
document.addEventListener("DOMContentLoaded", function() {
    let hamburger = document.querySelector(".hamburger")
    let header = document.querySelector('header')
    let navBar = document.querySelector(".nav-bar")
    let navLinks = document.querySelectorAll(".nav-bar ul li a.option")

    // Function to set the active class based on the current URL
    function setActiveLink() {
        const currentPath = window.location.pathname
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                link.classList.add("active")
            } else {
                link.classList.remove("active")
            }
        })
    }

    // Toggle navigation bar on hamburger click
    hamburger.addEventListener('click', function() {
        header.classList.toggle('active')
        navBar.classList.toggle("active")
    })


    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove("active"));
            // Add active class to the clicked link
            this.classList.add("active");
            // Close the navigation menu if open (for mobile view)
            navBar.classList.remove("active");
        })
    })

    // Set the active link on page load
    setActiveLink()
})
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

// Toggle high contrast mode
document.body.classList.add("normal-contrast");

document.getElementById('ncrForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    
    const formMessage = document.getElementById('formMessage');
    formMessage.innerHTML = ''; // Clear previous messages
    
    // Example of handling submission (you can add more logic)
    formMessage.innerHTML = 'Form has been submitted successfully!';
    formMessage.style.color = 'green';
});