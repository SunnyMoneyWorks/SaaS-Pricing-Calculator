document.getElementById("calculatorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const price = parseFloat(document.getElementById("price").value);
  const users = parseInt(document.getElementById("users").value);
  const churn = parseFloat(document.getElementById("churn").value);
  const cac = parseFloat(document.getElementById("cac").value);

  const mrr = price * users;
  const arr = mrr * 12;
  const arpu = mrr / users;
  const lifetimeMonths = 100 / churn;
  const ltv = arpu * lifetimeMonths;
  const profit = ltv - cac;

  // Show results
  document.getElementById("mrr").textContent = mrr.toFixed(2);
  document.getElementById("arr").textContent = arr.toFixed(2);
  document.getElementById("arpu").textContent = arpu.toFixed(2);
  document.getElementById("ltv").textContent = ltv.toFixed(2);
  document.getElementById("profit").textContent = profit.toFixed(2);

  // Draw chart
  drawChart(price, users, churn);
});

let chart;
function drawChart(price, users, churn) {
  const months = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
  let revenue = [];
  let activeUsers = users;

  for (let i = 0; i < 12; i++) {
    revenue.push(activeUsers * price);
    activeUsers = activeUsers * (1 - churn / 100);
  }

  if (chart) chart.destroy();

  const ctx = document.getElementById("revenueChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [{
        label: "Projected MRR (₹)",
        data: revenue,
        fill: false,
        borderColor: "#007bff",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });
}
