const API_URL = "http://localhost:5000";

// Load all policies when page loads
window.onload = function () {
  loadPolicies();
};

// Fetch all policies
function loadPolicies() {
  fetch(`${API_URL}/policies`)
    .then(response => response.json())
    .then(data => displayPolicies(data))
    .catch(error => console.error("Error:", error));
}

// Filter policies by premium range
function filterPolicies() {
  const min = document.getElementById("minPrice").value;
  const max = document.getElementById("maxPrice").value;

  if (!min || !max) {
    alert("Please enter both Min and Max price");
    return;
  }

  fetch(`${API_URL}/policies/filter?min=${min}&max=${max}`)
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