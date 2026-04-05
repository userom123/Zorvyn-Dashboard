let state = {
    transactions: JSON.parse(localStorage.getItem("transactions")) || [],
    role: "admin"
};

let lineChart, pieChart;

document.getElementById("roleSelect").addEventListener("change", (e) => {
    state.role = e.target.value;
    render();
});

document.getElementById("search").addEventListener("input", renderTable);

function addTransaction() {
    if (state.role !== "admin") return alert("Viewer cannot add");

    let t = {
        text: document.getElementById("text").value,
        amount: Number(document.getElementById("amount").value),
        date: document.getElementById("date").value,
        category: document.getElementById("category").value,
        type: document.getElementById("type").value
    };

    state.transactions.push(t);
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
    render();
}

function calculateSummary() {
    let income = 0, expense = 0;

    state.transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = expense;
    document.getElementById("balance").innerText = income - expense;
}

function renderTable() {
    let search = document.getElementById("search").value.toLowerCase();
    let html = "";

    state.transactions
        .filter(t => t.text.toLowerCase().includes(search))
        .forEach(t => {
            html += `
                <tr>
                    <td>${t.date}</td>
                    <td>${t.text}</td>
                    <td>${t.amount}</td>
                    <td>${t.category}</td>
                    <td>${t.type}</td>
                </tr>
            `;
        });

    document.getElementById("transactionTable").innerHTML = html;
}

function renderCharts() {
    let balanceData = [];
    let labels = [];

    let total = 0;
    state.transactions.forEach(t => {
        total += t.type === "income" ? t.amount : -t.amount;
        balanceData.push(total);
        labels.push(t.date);
    });

    if (lineChart) lineChart.destroy();
    if (pieChart) pieChart.destroy();

    lineChart = new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Balance Trend",
                data: balanceData
            }]
        }
    });

    let categoryMap = {};
    state.transactions.forEach(t => {
        if (t.type === "expense") {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        }
    });

    pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: Object.keys(categoryMap),
            datasets: [{
                data: Object.values(categoryMap)
            }]
        }
    });
}

function renderInsights() {
    let categoryMap = {};
    state.transactions.forEach(t => {
        if (t.type === "expense") {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        }
    });

    let top = Object.keys(categoryMap).reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b, "None");

    document.getElementById("topCategory").innerText =
        "Top Spending Category: " + top;

    document.getElementById("monthlyCompare").innerText =
        "Total Transactions: " + state.transactions.length;
}

function render() {
    calculateSummary();
    renderTable();
    renderCharts();
    renderInsights();

    document.getElementById("adminPanel").style.display =
        state.role === "admin" ? "block" : "none";
}

render();

if (state.transactions.length === 0) {
    state.transactions = [
        { text: "Salary", amount: 50000, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Deposite", amount: 340, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 563, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Expense", amount: 3753, category: "Expense", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 8456, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 525, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 245, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 9264, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 652, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 9538, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 7000, category: "Salary", type: "income", date: "2026-04-01" },
        { text: "Salary", amount: 2455, category: "Salary", type: "income", date: "2026-04-01" },



        { text: "Food", amount: 5000, category: "Food", type: "expense", date: "2026-04-02" }
    ];
}

let darkMode = localStorage.getItem("darkMode") === "true";

if (darkMode) {
    document.body.classList.add("dark");
}

document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    
    let isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
});


// start Gsap Animation code -- //

gsap.from("header", { 
    opacity: 0, 
    y: -50, 
    duration: 1.5
 });

 gsap.from("header h1", { 
    opacity: 0, 
    y: -50, 
    duration: 1.5
 });

  gsap.from(".card", { 
    opacity: 0, 
    x: -10, 
    delay:1,
    duration: 1.3
 });

   gsap.from(".cards", { 
    opacity: 0, 
    x: -10, 
    delay:1,
    duration: 1.3
 });


   gsap.from(".charts", { 
    opacity: 0, 
    y: 10, 
    delay:1,
    duration: 1.3
 });
