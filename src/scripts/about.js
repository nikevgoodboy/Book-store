// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Function to animate the counter
function animateCounter(counterElement) {
    const target = parseInt(counterElement.getAttribute('data-target')); // Get target number
    let current = 0;
    const increment = target / 100; // Speed of counting (higher values are slower)

    // Increment the number
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval); // Stop once the target is reached
        }
        counterElement.textContent = Math.floor(current) + "+"; // Update the displayed number
    }, 30); // Adjust the time (lower values = faster)
}

// Function to check and run animation for all counters
function checkCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
        if (isInViewport(counter) && !counter.classList.contains('animated')) {
            animateCounter(counter);
            counter.classList.add('animated'); // Prevent animation from running multiple times
        }
    });
}

// Run on page load and every scroll
window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);
