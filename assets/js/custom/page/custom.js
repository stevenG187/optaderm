document.addEventListener("DOMContentLoaded", function() {
    // Add click event listener to elements with class 'titleWrapper'
    document.querySelectorAll('.titleWrapper').forEach(function(titleWrapper) {
        titleWrapper.addEventListener('click', function() {
            // Select the next sibling div with the class 'desWrapper'
            var toggle = this.nextElementSibling;

            // Toggle visibility of the corresponding description wrapper
            if (toggle) {
                toggle.style.transition = 'max-height 0.6s ease';
                if (toggle.style.maxHeight) {
                    toggle.style.maxHeight = null; // Hide the element
                } else {
                    toggle.style.maxHeight = toggle.scrollHeight + "px"; // Show the element
                }
            }
        });
    });

    // Add click event listener to elements with class 'inactive'
    document.querySelectorAll('.inactive').forEach(function(inactive) {
        inactive.addEventListener('click', function() {
            this.classList.toggle('inactive');
            this.classList.toggle('active');
        });
    });
});
