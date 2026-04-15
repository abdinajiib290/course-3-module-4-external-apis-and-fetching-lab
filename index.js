// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!

const button = document.getElementById("get-alerts");
const input = document.getElementById("state-input");
const display = document.getElementById("alerts-display");
const errorBox = document.getElementById("error-message");

if (button) {
  button.addEventListener("click", async () => {
    const state = input.value.trim().toUpperCase();

    try {
      const response = await fetch(weatherApi + state);

      if (!response.ok) {
        throw new Error("Network error");
      }

      const data = await response.json();

      // clear error
      errorBox.classList.add("hidden");
      errorBox.textContent = "";

      // clear old results
      display.innerHTML = "";

      const alerts = data.features;

      // show count
      display.textContent = `Weather Alerts: ${alerts.length}`;

      // show alerts
      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        display.appendChild(p);
      });

    } catch (error) {
      errorBox.classList.remove("hidden");
      errorBox.textContent = error.message;
    }

    // clear input
    input.value = "";
  });
}