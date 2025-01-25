const cases = [];

const caseForm = document.getElementById("case-form");
const casesList = document.getElementById("cases");

function renderCases() {
  casesList.innerHTML = "";
  cases.forEach((c, index) => {
    const li = document.createElement("li");
    li.textContent = `${c.title} - ${c.location} (${c.type}) on ${c.date}`;
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View";
    viewBtn.onclick = () => {
      alert(`Viewing Case: ${JSON.stringify(c, null, 2)}`);
    };
    li.appendChild(viewBtn);
    casesList.appendChild(li);
  });
}

// caseForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newCase = {
//     title: document.getElementById("case-title").value,
//     location: document.getElementById("case-location").value,
//     date: document.getElementById("case-date").value,
//     type: document.getElementById("case-type").value,
//   };
//   cases.push(newCase);
//   renderCases();
//   caseForm.reset();
// });

document.getElementById('case-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('case-title').value;
  const location = document.getElementById('case-location').value;
  
  const response = await fetch('/police', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, location })
  });

  const result = await response.json();
  alert(result.message);
  location.reload();
});
