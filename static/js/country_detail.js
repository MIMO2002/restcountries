// JavaScript to handle the modal functionality
var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];

// Open the modal when the page loads
window.onload = function() {
    modal.style.display = "block";
};

// Close the modal when the close button is clicked and redirect to /home
closeBtn.onclick = function() {
    modal.style.display = "none";
    window.location.href = "/home";
};

// Close the modal when the user clicks outside the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        window.location.href = "/home";
    }
};
