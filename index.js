/**
 * SpiritX 2026 Countdown Timer
 * A clean, maintainable countdown timer implementation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cached DOM elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownDisplay = document.getElementById('countdown-display');
    const countdownMessage = document.getElementById('countdown-message');
    
    // Configuration
    let targetDate;
    let eventMessage = "The future is now.";
    
    /**
     * Initialize the countdown timer
     */
    function initCountdown() {
        loadConfiguration();
        updateCountdown();
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
    }
    
    /**
     * Load configuration from localStorage
     */
    function loadConfiguration() {
        // Check if there's a saved date
        const savedDate = localStorage.getItem('spiritx-countdown-date');
        const savedMessage = localStorage.getItem('spiritx-countdown-message');
        
        // Use saved date or default to January 1, 2026
        targetDate = savedDate 
            ? new Date(savedDate) 
            : new Date('2026-01-01T00:00:00');
        
        // Use saved message or default
        eventMessage = savedMessage || eventMessage;
        
        // Update message text
        document.querySelector('#countdown-message p').textContent = eventMessage;
    }
    
    /**
     * Update the countdown timer display
     */
    function updateCountdown() {
        const currentTime = new Date();
        const timeDifference = targetDate - currentTime;
        
        // Check if countdown has ended
        if (timeDifference <= 0) {
            showEventArrived();
            return;
        }
        
        // Calculate time units
        const timeUnits = calculateTimeUnits(timeDifference);
        
        // Update DOM
        updateDisplayValues(timeUnits);
        
        // Add visual effects for seconds change
        addTickEffect(secondsElement);
    }
    
    /**
     * Calculate days, hours, minutes and seconds from time difference
     * @param {number} timeDifference - Time difference in milliseconds
     * @return {Object} Object containing days, hours, minutes, seconds
     */
    function calculateTimeUnits(timeDifference) {
        // Ensure positive value
        timeDifference = Math.max(0, timeDifference);
        
        // Calculate time units
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    }
    
    /**
     * Update display values with calculated time units
     * @param {Object} timeUnits - Object containing days, hours, minutes, seconds
     */
    function updateDisplayValues(timeUnits) {
        daysElement.textContent = padNumber(timeUnits.days);
        hoursElement.textContent = padNumber(timeUnits.hours);
        minutesElement.textContent = padNumber(timeUnits.minutes);
        secondsElement.textContent = padNumber(timeUnits.seconds);
    }
    
    /**
     * Pad a number with leading zeros
     * @param {number} number - Number to pad
     * @return {string} Padded number string
     */
    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }
    
    /**
     * Add tick effect to an element
     * @param {HTMLElement} element - Element to add effect to
     */
    function addTickEffect(element) {
        // Add class for animation
        element.classList.add('tick-effect');
        
        // Remove class after animation completes
        setTimeout(() => {
            element.classList.remove('tick-effect');
        }, 500);
    }
    
    /**
     * Show the event arrived message
     */
    function showEventArrived() {
        countdownDisplay.classList.add('hidden');
        countdownMessage.classList.remove('hidden');
    }
    
    // Initialize the countdown
    initCountdown();
});