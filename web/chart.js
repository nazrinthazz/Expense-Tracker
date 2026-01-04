const API_BASE = "https://xqqbjyshjl.execute-api.us-east-1.amazonaws.com/prod";
let chart;
let allExpenses = [];

async function loadExpenses() {
    const res = await fetch(`${API_BASE}/expenses?userId=user123`);
    allExpenses = await res.json();
    updateChart();
}

function updateChart() {
    const filter = document.getElementById("chartFilter").value;
    let grouped = {};
    let chartType = "line";

    if (filter === "daily") {
        allExpenses.forEach(e => grouped[e.date] = (grouped[e.date] || 0) + e.amount);
        grouped = sortObjectByDate(grouped);
    } else if (filter === "monthly") {
        allExpenses.forEach(e => {
            const d = new Date(e.date);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
            grouped[key] = (grouped[key] || 0) + e.amount;
        });
        grouped = sortObjectByDate(grouped, "-01");
    } else if (filter === "category") {
        chartType = "pie";
        allExpenses.forEach(e => grouped[e.category] = (grouped[e.category] || 0) + e.amount);
    }

    drawChart(Object.keys(grouped), grouped, filter, chartType);
}

function drawChart(labels, dataMap, title, type) {
    const ctx = document.getElementById("expenseChart");
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: type,
        data: {
            labels,
            datasets: [{
                label: title + " (₹)",
                data: labels.map(l => dataMap[l]),
                borderColor: "#2563eb",
                backgroundColor: type === "pie"
                    ? ["#007bff","#28a745","#ffc107","#dc3545","#6f42c1","#fd7e14"]
                    : "rgba(37,99,235,0.15)",
                fill: type !== "pie",
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: type !== "pie" ? { y: { beginAtZero: true } } : {},
            plugins: { legend: { display: true } }
        }
    });
}

function sortObjectByDate(obj, appendDay="") {
    return Object.keys(obj).sort((a,b) => new Date(a+appendDay) - new Date(b+appendDay))
        .reduce((res,key) => (res[key] = obj[key], res), {});
}

function goBack() {
    window.history.back();
}

// Load expenses when page loads
loadExpenses();
