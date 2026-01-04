const API_BASE = "https://xqqbjyshjl.execute-api.us-east-1.amazonaws.com/prod";

// ---------- ADD EXPENSE ----------
async function addExpense() {
  try {
    const userId = "user123";
    const amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const tags = document.getElementById("tags").value
      ? document.getElementById("tags").value.split(",").map(t => t.trim())
      : [];

    if (!amount || !category || !date) {
      alert("Amount, category, and date are required!");
      return;
    }

    if (category === "Custom") {
      const newCategory = prompt("Enter custom category name:");
      if (!newCategory) return;

      category = newCategory;
      const select = document.getElementById("category");
      const option = document.createElement("option");
      option.value = newCategory;
      option.textContent = newCategory;
      select.insertBefore(option, select.lastChild);
      select.value = newCategory;
    }

    const expense = { userId, amount, category, date, tags };

    const res = await fetch(`${API_BASE}/expense`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    });

    if (!res.ok) throw new Error("Failed");

    clearForm();
    loadExpenses();

  } catch (err) {
    alert("Error adding expense");
  }
}

// ---------- LOAD EXPENSES ----------
async function loadExpenses() {
  const res = await fetch(`${API_BASE}/expenses?userId=user123`);
  const expenses = await res.json();

  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  let total = 0;

  expenses.forEach(exp => {
    total += exp.amount;

    const row = document.createElement("div");
    row.className = "expense-row";

    row.innerHTML = `
      <div class="expense-info">
        <div class="expense-date">${formatDate(exp.date)}</div>
        <div class="expense-category">${exp.category}</div>
        <div class="expense-amount">₹${exp.amount}</div>
      </div>
      <button class="delete-btn" onclick="deleteExpense('${exp.expenseId}')">✖</button>
    `;

    list.appendChild(row);
  });

  document.getElementById("total").innerText = `₹${total}`;
}

// ---------- DELETE ----------
async function deleteExpense(expenseId) {
  if (!confirm("Delete this expense?")) return;
  await fetch(`${API_BASE}/expense/${expenseId}`, { method: "DELETE" });
  loadExpenses();
}

// ---------- HELPERS ----------
function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "Food";
  document.getElementById("date").value = "";
  document.getElementById("tags").value = "";
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
}

function openChart() {
  window.location.href = "chart.html";
}

loadExpenses();
