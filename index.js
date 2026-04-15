// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

// Your code here!

function fetchWeatherAlerts(state) {
  const url = weatherApi + state;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather alerts");
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // for testing
      displayAlerts(data);
      clearUI();
    })
    .catch(error => {
      showError(error.message);
    });
}

function displayAlerts(data) {
  const container = document.getElementById("alerts");
  const errorBox = document.getElementById("error-message");

  // reset error
  errorBox.textContent = "";
  errorBox.style.display = "none";

  // clear old results
  container.innerHTML = "";

  const features = data.features;

  if (!features || features.length === 0) {
    container.innerHTML = "<p>No active alerts for this state.</p>";
    return;
  }

  const title = document.createElement("h3");
  title.textContent = `Current watches, warnings, and advisories: ${features.length}`;
  container.appendChild(title);

  const list = document.createElement("ul");

  features.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  container.appendChild(list);
}

function showError(message) {
  const errorBox = document.getElementById("error-message");

  errorBox.textContent = message;
  errorBox.style.display = "block";
}

function clearUI() {
  document.getElementById("state-input").value = "";
}

function handleSubmit() {
  const input = document.getElementById("state-input");
  const state = input.value.trim().toUpperCase();

  // validate input (2 letters)
  if (!/^[A-Z]{2}$/.test(state)) {
    showError("Please enter a valid 2-letter state code (e.g. CA, NY).");
    return;
  }

  fetchWeatherAlerts(state);
}