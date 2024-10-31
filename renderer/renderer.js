document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners(); // Call the setup function on DOM load
});

// Function to set up event listeners for buttons
function setupEventListeners() {
    const loginButton = document.getElementById('login-btn');
    const logoutButton = document.getElementById('logout-btn');
    const addMatchButton = document.getElementById('add-match-btn');
    const viewScheduleButton = document.getElementById('view-schedule-btn');
    const matchForm = document.getElementById('match-form');

    // Event listener for the login button
    loginButton.addEventListener('click', handleLogin);

    // Event listener for the logout button
    logoutButton.addEventListener('click', handleLogout);

    // Event listener for the add match button
    addMatchButton.addEventListener('click', handleAddMatch);

    // Event listener for the view schedule button
    viewScheduleButton.addEventListener('click', handleViewSchedule);

    // Prevent form submission and call handleAddMatch instead
    matchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleAddMatch();
    });
}

// Function to handle viewing the schedule
async function handleViewSchedule() {
    console.log("Fetching schedule...");
    try {
        const response = await fetch('http://localhost:3000/schedule'); // Ensure this endpoint exists
        if (response.ok) {
            const schedule = await response.json();
            displaySchedule(schedule);
        } else {
            throw new Error('Failed to fetch schedule');
        }
    } catch (error) {
        console.error("Error fetching schedule:", error);
        alert('Could not fetch the schedule. Please try again later.');
    }
}

// Function to display the schedule
function displaySchedule(schedule) {
    const scheduleContainer = document.getElementById('matches'); // Assuming matches div is used for schedule display
    scheduleContainer.innerHTML = ''; // Clear previous matches

    schedule.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match';
        matchElement.innerHTML = `
            <h3>${match.matchName}</h3>
            <p>Date: ${match.date}</p>
            <p>Teams: ${match.teams}</p>
        `;
        scheduleContainer.appendChild(matchElement);
    });
}

// Function to handle adding a match
async function handleAddMatch() {
    const matchName = document.getElementById('match-name').value;
    const matchDate = document.getElementById('match-date').value;
    const matchTeams = document.getElementById('match-teams').value;

    const matchData = {
        matchName,
        date: matchDate,
        teams: matchTeams
    };

    console.log("Adding match:", matchData);
    try {
        const response = await fetch('http://localhost:3000/add-match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(matchData)
        });

        if (response.ok) {
            alert('Match added successfully!');
            document.getElementById('match-form').reset(); // Reset the form
            handleViewSchedule(); // Refresh the schedule after adding a match
        } else {
            throw new Error('Failed to add match');
        }
    } catch (error) {
        console.error("Error adding match:", error);
        alert('Could not add the match. Please try again later.');
    }
}

// Function to handle login (placeholder)
async function handleLogin() {
    console.log("Login functionality is yet to be implemented.");
}

// Function to handle logout (placeholder)
async function handleLogout() {
    console.log("Logout functionality is yet to be implemented.");
}
