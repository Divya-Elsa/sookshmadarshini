// DOM Elements
const switchViewBtn = document.getElementById("switch-view");
const dashboardTitle = document.getElementById("dashboard-title");
const policeView = document.getElementById("police-view");
const userView = document.getElementById("user-view");
const newCaseForm = document.getElementById("new-case-form");
const casesList = document.getElementById("cases-list");
const notificationsList = document.getElementById("notifications-list");
const reportForm = document.getElementById("report-form");
const reportCase = document.getElementById("report-case");

// Data
let cases = [];
let notifications = [];

// Switch between Police and User views
switchViewBtn.addEventListener("click", () => {
  if (policeView.classList.contains("hidden")) {
    dashboardTitle.textContent = "Police Dashboard";
    policeView.classList.remove("hidden");
    userView.classList.add("hidden");
    switchViewBtn.textContent = "Switch to User View";
  } else {
    dashboardTitle.textContent = "User Dashboard";
    userView.classList.remove("hidden");
    policeView.classList.add("hidden");
    switchViewBtn.textContent = "Switch to Police View";
  }
});

// Add a new case
newCaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("case-title").value;
  const description = document.getElementById("case-description").value;
  const location = document.getElementById("case-location").value;
  const type = document.getElementById("case-type").value;

  const newCase = {
    id: cases.length + 1,
    title,
    description,
    location,
    type,
    status: "Pending",
  };

  cases.push(newCase);
  notifications.push(`New case filed: ${title}`);
  updateCases();
  updateNotifications();

  newCaseForm.reset();
});

// Update cases list
function updateCases() {
  casesList.innerHTML = "";
  reportCase.innerHTML = '<option value="">Select a Case</option>';

  cases.forEach((caseItem) => {
    const li = document.createElement("li");
    li.textContent = `${caseItem.title} - ${caseItem.location} (${caseItem.type}) [Status: ${caseItem.status}]`;
    casesList.appendChild(li);

    const option = document.createElement("option");
    option.value = caseItem.id;
    option.textContent = caseItem.title;
    reportCase.appendChild(option);
  });
}

// Update notifications list
function updateNotifications() {
  notificationsList.innerHTML = "";
  notifications.forEach((notif) => {
    const li = document.createElement("li");
    li.textContent = notif;
    notificationsList.appendChild(li);
  });
}

// Submit a report
reportForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const caseId = reportCase.value;
  const content = document.getElementById("report-content").value;

  const selectedCase = cases.find((c) => c.id === parseInt(caseId));
  if (selectedCase) {
    selectedCase.status = "Reported";
    notifications.push(`Report submitted for case: ${selectedCase.title}`);
    updateNotifications();
    updateCases();
  }

  reportForm.reset();
});

