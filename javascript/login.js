document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const formMessage = document.getElementById("formMessage");

        // Password validation
        if (username === "admin" && password === "password") {
            formMessage.innerHTML = "Login successful!";
            formMessage.style.color = "green";
            setTimeout(() => {
                // go to homepage
                window.location.href = "index.html"; 
            }, 1000);
        } else {
            formMessage.innerHTML = "Invalid username or password.";
            formMessage.style.color = "red";
        }
    });
});
