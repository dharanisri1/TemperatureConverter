const cityAdjustments = {
  Chennai: 0,
  Mumbai: -2,
  Delhi: 1,
  Bangalore: -4,
  Kolkata: -1,
  Hyderabad: -2,
  Pune: -3,
  Jaipur: 2,
  Ahmedabad: 3,
  Lucknow: -1.5
};

function restrictInput(fieldId) {
  const fields = ["celsius", "fahrenheit", "kelvin"];
  fields.forEach(id => {
    if (id !== fieldId) {
      document.getElementById(id).value = "";
    }
  });
}
function isValidNumber(value) {
  const numericPattern = /^-?\d+(\.\d+)?$/;
  return numericPattern.test(value);
}


function calculateTemperature() {
  const city = document.getElementById("city").value;
  const celsiusInput = document.getElementById("celsius").value.trim();
  const fahrenheitInput = document.getElementById("fahrenheit").value.trim();
  const kelvinInput = document.getElementById("kelvin").value.trim();
  const result = document.getElementById("result");

  if (!city || !(city in cityAdjustments)) {
    alert("Please select a valid city.");
    return;
  }

  let baseCelsius;

  if (celsiusInput) {
    const value = parseFloat(celsiusInput);
    if (!isValidNumber(value)) {
      alert("Invalid Celsius value.");
      return;
    }
    baseCelsius = value;
  } else if (fahrenheitInput) {
    const value = parseFloat(fahrenheitInput);
    if (!isValidNumber(value)) {
      alert("Invalid Fahrenheit value.");
      return;
    }
    baseCelsius = (value - 32) * 5 / 9;
  } else if (kelvinInput) {
    const value = parseFloat(kelvinInput);
    if (!isValidNumber(value)) {
      alert("Invalid Kelvin value.");
      return;
    }
    baseCelsius = value - 273.15;
  } else {
    alert("Please enter a temperature value.");
    return;
  }

  const adjustedCelsius = baseCelsius + cityAdjustments[city];
  const adjustedFahrenheit = (adjustedCelsius * 9 / 5) + 32;
  const adjustedKelvin = adjustedCelsius + 273.15;

  result.innerHTML = `
    <strong>Adjusted Temperature for ${city}:</strong><br>
    Celsius: ${adjustedCelsius.toFixed(2)} °C<br>
    Fahrenheit: ${adjustedFahrenheit.toFixed(2)} °F<br>
    Kelvin: ${adjustedKelvin.toFixed(2)} K
  `;
  addToHistory(
  city,
  adjustedCelsius.toFixed(2),
  adjustedFahrenheit.toFixed(2),
  adjustedKelvin.toFixed(2)
);

}

function addToHistory(city, celsius, fahrenheit, kelvin) {
  const historyList = document.getElementById("history-list");
  const entry = document.createElement("div");
  entry.innerHTML = `<strong>${city}:</strong> ${celsius} °C | ${fahrenheit} °F | ${kelvin} K`;
  historyList.prepend(entry);
}
function changeTheme(theme) {
  const panel = document.getElementById("left-panel");
  panel.classList.remove("sunny", "cloudy", "night");
  panel.classList.add(theme);
}
function toggleInfo() {
  const info = document.getElementById("info-text");
  info.style.display = info.style.display === "none" ? "block" : "none";
}
function toggleHistory() {
  const modal = document.getElementById("history-modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}
function startClock() {
  const clock = document.getElementById("clock");
  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }, 1000);
}
window.onload = function () {
  startClock();
  document.getElementById("celsius").addEventListener("input", () => restrictInput("celsius"));
  document.getElementById("fahrenheit").addEventListener("input", () => restrictInput("fahrenheit"));
  document.getElementById("kelvin").addEventListener("input", () => restrictInput("kelvin"));
};

