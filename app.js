document.getElementById("myform").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the traditional form submission

    const dobElement = document.getElementById("dob");
    const leElement = document.getElementById("life-expectancy");
    const countdownDisplay = document.querySelector(".count-down span");

    const dob = new Date(dobElement.value);
    const lifeExpectancy = parseInt(leElement.value, 10);

    // Calculate remaining time in seconds
    const totalSeconds = calculateRemainingTimeInSeconds(dob, lifeExpectancy);
    let remainingTimeInSeconds = totalSeconds;
    countdownDisplay.textContent = formatTime(remainingTimeInSeconds);

    const countdownInterval = setInterval(() => {
        remainingTimeInSeconds--;

        if (remainingTimeInSeconds <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "00:00:00";
        } else {
            countdownDisplay.textContent = formatTime(remainingTimeInSeconds);
        }
    }, 1000); // 1000 milliseconds = 1 second
});

function calculateRemainingTimeInSeconds(dob, lifeExpectancy) {
    const now = new Date();
    const currentAge = now.getFullYear() - dob.getFullYear();
    const remainingYears = lifeExpectancy - currentAge;
    return remainingYears * 365 * 24 * 60 * 60; // Convert years to seconds
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs].map(val => String(val).padStart(2, '0')).join(':');
}
