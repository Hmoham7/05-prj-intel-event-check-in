// Get page elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const goalMessage = document.getElementById("goalMessage");
const attendeeList = document.getElementById("attendeeList");

const waterCountElement = document.getElementById("waterCount");
const zeroCountElement = document.getElementById("zeroCount");
const powerCountElement = document.getElementById("powerCount");

// Local storage keys
const TOTAL_KEY = "intelCheckinTotal";
const TEAMS_KEY = "intelCheckinTeams";
const ATTENDEES_KEY = "intelCheckinAttendees";

// App data
const maxCount = 50;
let count = 0;
let teamCounts = { water: 0, zero: 0, power: 0 };
let attendees = [];

function loadFromStorage() {
  const savedTotal = localStorage.getItem(TOTAL_KEY);
  const savedTeams = localStorage.getItem(TEAMS_KEY);
  const savedAttendees = localStorage.getItem(ATTENDEES_KEY);

  if (savedTotal !== null) {
    count = parseInt(savedTotal, 10);
  }

  if (savedTeams !== null) {
    const parsedTeams = JSON.parse(savedTeams);
    teamCounts.water = parsedTeams.water || 0;
    teamCounts.zero = parsedTeams.zero || 0;
    teamCounts.power = parsedTeams.power || 0;
  }

  if (savedAttendees !== null) {
    attendees = JSON.parse(savedAttendees);
  }
}

function saveToStorage() {
  localStorage.setItem(TOTAL_KEY, String(count));
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teamCounts));
  localStorage.setItem(ATTENDEES_KEY, JSON.stringify(attendees));
}

function getWinningTeamName() {
  let winner = "Team Water Wise";
  let highest = teamCounts.water;

  if (teamCounts.zero > highest) {
    winner = "Team Net Zero";
    highest = teamCounts.zero;
  }

  if (teamCounts.power > highest) {
    winner = "Team Renewables";
  }

  return winner;
}

function updateProgressBar() {
  let progressPercent = Math.round((count / maxCount) * 100);

  if (progressPercent > 100) {
    progressPercent = 100;
  }

  progressBar.style.width = `${progressPercent}%`;
}

function updateGoalMessage() {
  if (count >= maxCount) {
    goalMessage.textContent = `🎉 Check-in goal reached! Winning team: ${getWinningTeamName()}`;
    goalMessage.style.display = "block";
  } else {
    goalMessage.style.display = "none";
  }
}

function updateAttendeeList() {
  attendeeList.innerHTML = "";

  if (attendees.length === 0) {
    attendeeList.innerHTML = '<li class="attendee-empty">No attendees checked in yet.</li>';
    return;
  }

  let i = 0;
  while (i < attendees.length) {
    const attendee = attendees[i];
    const item = document.createElement("li");
    item.className = "attendee-item";
    item.innerHTML = `<span>${attendee.name}</span><span class="attendee-team">${attendee.teamName}</span>`;
    attendeeList.appendChild(item);
    i = i + 1;
  }
}

function updateScreen() {
  attendeeCount.textContent = count;
  waterCountElement.textContent = teamCounts.water;
  zeroCountElement.textContent = teamCounts.zero;
  powerCountElement.textContent = teamCounts.power;

  updateProgressBar();
  updateGoalMessage();
  updateAttendeeList();
}

loadFromStorage();
updateScreen();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  count = count + 1;
  teamCounts[team] = teamCounts[team] + 1;

  attendees.push({
    name: name,
    team: team,
    teamName: teamName
  });

  greeting.textContent = `Welcome, ${name} from ${teamName}!`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  saveToStorage();
  updateScreen();
  form.reset();
});
