document.addEventListener("DOMContentLoaded", () => {
    const userType = document.getElementById("user-type");
    const commonFields = document.getElementById("common-fields");
    const policeFields = document.getElementById("police-fields");
    const citizenFields = document.getElementById("citizen-fields");
    const getLocationButton = document.getElementById("get-location");
    const locationInput = document.getElementById("location");
    const locationError = document.getElementById("location-error");
  
    // Handle user type selection
    userType.addEventListener("change", () => {
      const type = userType.value;
      policeFields.classList.add("hidden");
      citizenFields.classList.add("hidden");
  
      if (type === "police") {
        policeFields.classList.remove("hidden");
      } else if (type === "citizen") {
        citizenFields.classList.remove("hidden");
      }
    });
  
    // Handle location fetching
    getLocationButton.addEventListener("click", () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            locationInput.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            locationError.style.display = "none";
          },
          (error) => {
            console.error("Error getting location:", error.message);
            locationError.style.display = "block";
            locationError.textContent = "Unable to retrieve location. Please enter it manually.";
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    });
  
    // Handle form submission (optional)
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login form submitted!");
    });
  });
  