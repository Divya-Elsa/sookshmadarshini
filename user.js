const cases = [
    { id: "101", title: "Theft in Market", location: "Market Area" },
    { id: "102", title: "Suspicious Activity", location: "Sector 5" },
  ];
  
  const caseSelect = document.getElementById("case-select");
  const userCasesList = document.getElementById("user-cases");
  const reportForm = document.getElementById("report-form");
  
  function renderUserCases() {
    userCasesList.innerHTML = "";
    cases.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = `${c.title} (${c.location})`;
      userCasesList.appendChild(li);
  
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.title;
      caseSelect.appendChild(option);
    });
  }
  
  reportForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedCase = caseSelect.value;
    const reportContent = document.getElementById("report-content").value;
    alert(`Report submitted for Case #${selectedCase}: ${reportContent}`);
    reportForm.reset();
  });
  
  renderUserCases();
  