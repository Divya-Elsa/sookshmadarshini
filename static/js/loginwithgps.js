const roleForm = document.getElementById("role-form");
const policeLogin = document.getElementById("police-login");
const citizenLogin = document.getElementById("citizen-login");
const loginPage = document.getElementById("login-page");

roleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedRole = document.getElementById("role-select").value;

  if (selectedRole === "police") {
    loginPage.classList.add("hidden");
    policeLogin.classList.remove("hidden");
  } else if (selectedRole === "citizen") {
    loginPage.classList.add("hidden");
    citizenLogin.classList.remove("hidden");
  } else {
    alert("Please select a valid role.");
  }
});

// Handle Police Login
document.getElementById("police-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Police Login Successful!");
  window.location.href = "police-dashboard.html";
});

// Handle Citizen Login
document.getElementById("citizen-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Citizen Login Successful!");
  window.location.href = "user-dashboard.html";
});
