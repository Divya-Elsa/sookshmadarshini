// Dummy credentials for Police and Citizen
const POLICE_CREDENTIALS = {
  username: "police123",
  password: "policepass",
};

const CITIZEN_CREDENTIALS = {
  username: "citizen123",
  password: "citizenpass",
};

// Elements
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const userNameDisplay = document.getElementById("user-name");
const userRoleDisplay = document.getElementById("user-role-display");
const reportSection = document.getElementById("report-section");
const notificationsSection = document.getElementById("notifications-section");
const reportForm = document.getElementById("report-form");
const reportCase = document.getElementById("report-case");
const notificationsList = document.getElementById("notifications-list");

// Dummy Data
const notifications = [
  "Suspicious activity reported in Sector 4",
  "Case #101 requires further details",
];
const cases = [
  { id: 1, title: "Case #101: Theft in Market Area" },
  { id: 2, title: "Case #102: Vandalism in Residential Zone" },
];

// Update Notifications and Cases
function updateNotifications() {
  notificationsList.innerHTML = "";
  notifications.forEach((notif) => {
    const li = document.createElement("li");
    li.textContent = notif;
    notificationsList.appendChild(li);
  });
}

function updateCases() {
  reportCase.innerHTML = '<option value="">Select a Case</option>';
  cases.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.title;
    reportCase.appendChild(option);
  });
}

// Handle Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const role = document.getElementById("user-role").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (role === "police" && username === POLICE_CREDENTIALS.username && password === POLICE_CREDENTIALS.password) {
    loginSuccessful(username, "Police");
  } else if (role === "citizen" && username === CITIZEN_CREDENTIALS.username && password === CITIZEN_CREDENTIALS.password) {
    loginSuccessful(username, "Citizen");
  } else {
    alert("Invalid credentials. Please try again.");
  }

  loginForm.reset();
});

function loginSuccessful(username, role) {
  alert(`Login successful! Welcome, ${username}.`);
  userNameDisplay.textContent = username;
  userRoleDisplay.textContent = role;

  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");

  // Show sections based on role
  if (role === "Police") {
    notificationsSection.classList.remove("hidden");
    reportSection.classList.add("hidden");
    updateNotifications();
  } else if (role === "Citizen") {
    notificationsSection.classList.remove("hidden");
    reportSection.classList.remove("hidden");
    updateNotifications();
    updateCases();
  }
}

// Handle Logout
logoutBtn.addEventListener("click", () => {
  dashboardSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

// Handle Report Submission (Citizen Only)
reportForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const caseId = reportCase.value;
  const reportContent = document.getElementById("report-content").value;

  if (caseId) {
    alert(`Your report has been submitted for case ID: ${caseId}\nContent: ${reportContent}`);
    reportForm.reset();
  } else {
    alert("Please select a case to report.");
  }
});
