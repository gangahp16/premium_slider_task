const tableBody = document.getElementById("policyTable");

// Load ALL policies when page loads
window.onload = () => {
  loadAllPolicies();
};

function loadAllPolicies() {
  fetch("http://localhost:5000/policies")
    .then(res => res.json())
    .then(data => renderTable(data))
    .catch(err => console.error(err));
}

function renderTable(policies) {
  tableBody.innerHTML = "";

  if (policies.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">No policies found</td></tr>`;
    return;
  }

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

function filterPolicies() {
  const min = document.getElementById("minPremium").value || 0;
  const max = document.getElementById("maxPremium").value || 999999;

  fetch(`http://localhost:5000/policies/filter?min=${min}&max=${max}`)
    .then(res => res.json())
    .then(data => renderTable(data))
    .catch(err => console.error(err));
}