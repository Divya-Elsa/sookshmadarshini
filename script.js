// Navigate to the selected page
function navigateTo(page) {
  window.location.href = page;
}

// Data storage for cases and notifications
const cases = [];
const notifications = [];

// Handle Police Dashboard functionality
if (document.getElementById("new-case-form")) {
  const newCaseForm = document.getElementById("new-case-form");
  const casesList = document.getElementById("cases-list");

  newCaseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("case-title").value;
    const description = document.getElementById("case-description").value;
    const location = document.getElementById("case-location").value;
    const type = document.getElementById("case-type").value;

    const newCase = { title, description, location, type };
    cases.push(newCase);
    notifications.push(`New case filed: ${title}`);

    updateCases();
    newCaseForm.reset();
  });

  function updateCases() {
    casesList.innerHTML = "";
    cases.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = `${c.title} - ${c.location} (${c.type})`;
      casesList.appendChild(li);
    });
  }
}

// Handle User Dashboard functionality
if (document.getElementById("report-form")) {
  const notificationsList = document.getElementById("notifications-list");
  const reportForm = document.getElementById("report-form");
  const reportCase = document.getElementById("report-case");

  function updateNotifications() {
    notificationsList.innerHTML = "";
    notifications.forEach((notif) => {
      const li = document.createElement("li");
      li.textContent = notif;
      notificationsList.appendChild(li);
    });
  }

  updateNotifications();

  reportForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("report-content").value;
    alert("Report submitted: " + content);
    reportForm.reset();
  });
}
