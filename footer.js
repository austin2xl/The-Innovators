// footer js

document.addEventListener("DOMContentLoaded", function() {
    // For Footer element
    var footer = document.createElement('footer');
    
    // Attach Footer links 
    var footerLinks = document.createElement('div');
    footerLinks.classList.add('footer-links');
    
    var facebookLink = document.createElement('a');
    facebookLink.href = '#';
    facebookLink.classList.add('fa', 'fa-facebook');
    
    var twitterLink = document.createElement('a');
    twitterLink.href = '#';
    twitterLink.classList.add('fa', 'fa-twitter');
    
    var instagramLink = document.createElement('a');
    instagramLink.href = '#';
    instagramLink.classList.add('fa', 'fa-instagram');
    
    // Append Icon links 
    footerLinks.appendChild(facebookLink);
    footerLinks.appendChild(twitterLink);
    footerLinks.appendChild(instagramLink);
    
    // Footer bottom 
    var footerBottom = document.createElement('div');
    footerBottom.classList.add('footer-bottom');
    
    var footerText = document.createElement('p');
    footerText.innerHTML = '&copy; 2024 Crossfire NCR. All Rights Reserved.';
    
    // Text to footerBottom div
    footerBottom.appendChild(footerText);
    
    // Append sections to the footer
    footer.appendChild(footerLinks);
    footer.appendChild(footerBottom);
    
    // Append the footer to the body
    document.body.appendChild(footer);
});