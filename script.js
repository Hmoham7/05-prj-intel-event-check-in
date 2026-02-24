// Get all needed DOM elements

const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

// Track attendance

let count = 0;
const maxCount = 50;
// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  console.log(name, teamName);

  // Increment count
  count++;
  console.log(" Total check-ins: " + count);

  // Show updated attendee count
  attendeeCount.textContent = count;

  // update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);
  progressBar.style.width = percentage;

  // update team counter
  const teamCounter = document.getElementById(`${team}Count`);
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // show welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  console.log(message);

  form.reset();
});
