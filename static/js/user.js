document.addEventListener("DOMContentLoaded", async function () {
  const caseList = document.getElementById("user-cases");
  const caseSelect = document.getElementById("case-select");
  const reportForm = document.getElementById("report-form");

  // Function to fetch cases from backend
  async function fetchCases() {
    try {
      const response = await fetch("http://127.0.0.1:5000/police", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const cases = await response.json();
      console.log("Cases received:", cases);

      // Populate the case list in the dashboard
      caseList.innerHTML = cases.map(c => 
        `<li><strong>${c.title}</strong> - ${c.location} (${c.date}, ${c.case_type})</li>`
      ).join("");

      // Populate the case selection dropdown
      caseSelect.innerHTML += cases.map(c => 
        `<option value="${c.title}">${c.title} (${c.case_type})</option>`
      ).join("");
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  }

  // Function to submit report
  async function submitReport(event) {
    event.preventDefault();

    const selectedCase = caseSelect.value;
    const reportContent = document.getElementById("report-content").value;

    if (!selectedCase || !reportContent) {
      alert("Please select a case and enter a report.");
      return;
    }

    const reportData = {
      case_id: selectedCase,
      content: reportContent,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        reportForm.reset();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  }

  reportForm.addEventListener("submit", submitReport);

  // Initial function calls
  fetchCases();
});
