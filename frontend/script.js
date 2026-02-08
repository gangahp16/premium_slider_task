const API_URL = "http://localhost:5000";

// Load all policies when page loads
window.onload = function () {
  loadPolicies();
};

// Fetch all policies
function loadPolicies() {
  fetch(`${API_URL}/policies`)
    .then(response => response.json())
    .then(data => {
      displayPolicies(data);
      setSliderMax(data);
    });
}

function setSliderMax(policies) {
  const slider = document.getElementById("priceSlider");
  const priceValue = document.getElementById("priceValue");

  // Find maximum premium from DB data
  const premiums = policies.map(p => p.premium);
  const maxPremium = Math.max(...premiums);

  slider.max = maxPremium;
  slider.value = maxPremium;
  priceValue.innerText = maxPremium;
}

// Filter policies by premium range
function updateSliderValue() {
  const slider = document.getElementById("priceSlider");
  const priceValue = document.getElementById("priceValue");

  const maxPrice = slider.value;
  priceValue.innerText = maxPrice;

  fetch(`${API_URL}/policies/filter?min=0&max=${maxPrice}`)
    .then(response => response.json())
    .then(data => displayPolicies(data))
    .catch(error => console.error("Error:", error));
}

// Display policies in table
function displayPolicies(policies) {
  const tableBody = document.getElementById("policyTableBody");
  tableBody.innerHTML = "";

  policies.forEach(policy => {
    const row = `
      <tr>
        <td>${policy.policyName}</td>
        <td>${policy.policyType}</td>
        <td>${policy.company}</td>
        <td>${policy.premium}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}