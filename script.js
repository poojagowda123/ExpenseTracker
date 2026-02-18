// console.log("JS loaded");

// // ================== DOM ELEMENTS ==================
// const expenseForm = document.getElementById("expenseForm");
// const expenseTableBody = document.getElementById("expenseTableBody");
// const totalAmountSpan = document.getElementById("totalAmount");
// const monthFilterInput = document.getElementById("monthFilter");
// const themeToggleBtn = document.getElementById("themeToggle");
// const animeHero = document.getElementById("animeHero");
// const selectedMonthText = document.getElementById("selectedMonthText");

// // ================== KEYS ==================
// const STORAGE_KEY = "my_expenses";
// const THEME_KEY = "expense_theme";

// // ================== STATE ==================
// let expenses = loadExpenses();
// let editingId = null;

// // ================== ANIME BACKGROUNDS ==================
// const animeBackgrounds = [
//   "onepiece.jpg",
//   "lookism.jpg",
//   "bluelock.jpg",
//   "jjk.jpg",
//   "demonslayer.jpg"
// ];
// let currentAnimeIndex = 0;

// // ================== ANIME SLIDESHOW ==================
// function setAnimeBackground(index) {
//   if (!animeHero) return;
//   const img = animeBackgrounds[index % animeBackgrounds.length];
//   animeHero.style.backgroundImage = `url("${img}")`;
// }

// function startAnimeSlideshow() {
//   if (!animeHero || animeBackgrounds.length === 0) return;
//   setAnimeBackground(currentAnimeIndex);

//   setInterval(() => {
//     currentAnimeIndex = (currentAnimeIndex + 1) % animeBackgrounds.length;
//     setAnimeBackground(currentAnimeIndex);
//   }, 5000); // 5 seconds
// }

// // ================== LOCAL STORAGE ==================
// function loadExpenses() {
//   const data = localStorage.getItem(STORAGE_KEY);
//   if (!data) return [];
//   try {
//     return JSON.parse(data);
//   } catch (e) {
//     console.error("Error parsing expenses:", e);
//     return [];
//   }
// }

// function saveExpenses() {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
// }

// // ================== MONTH UI HELPERS ==================
// function formatMonthLabel(value) {
//   if (!value) return "All months";

//   const [year, month] = value.split("-");
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const mIndex = Number(month) - 1;
//   if (mIndex < 0 || mIndex > 11) return value;

//   return `${monthNames[mIndex]} ${year}`;
// }

// function updateSelectedMonthUI() {
//   if (!selectedMonthText) return;
//   selectedMonthText.textContent = formatMonthLabel(monthFilterInput.value);
// }

// // ================== MONTH + RENDER ==================
// function setDefaultMonth() {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   monthFilterInput.value = `${year}-${month}`;
//   updateSelectedMonthUI();
// }

// function renderExpenses() {
//   const selectedMonth = monthFilterInput.value; // "YYYY-MM"
//   expenseTableBody.innerHTML = "";
//   let total = 0;

//   expenses.forEach(exp => {
//     const expenseMonth = exp.date.slice(0, 7);

//     // If no month selected, show all; else only this month
//     if (!selectedMonth || expenseMonth === selectedMonth) {
//       const row = document.createElement("tr");

//       const dateTd = document.createElement("td");
//       const amountTd = document.createElement("td");
//       const categoryTd = document.createElement("td");
//       const noteTd = document.createElement("td");
//       const actionsTd = document.createElement("td");

//       dateTd.textContent = exp.date;
//       amountTd.textContent = exp.amount.toFixed(2);
//       categoryTd.textContent = exp.category;
//       noteTd.textContent = exp.note || "-";

//       // Edit button
//       const editBtn = document.createElement("button");
//       editBtn.textContent = "Edit";
//       editBtn.classList.add("btn", "btn-edit");
//       editBtn.addEventListener("click", () => startEdit(exp.id));

//       // Delete button
//       const deleteBtn = document.createElement("button");
//       deleteBtn.textContent = "Delete";
//       deleteBtn.classList.add("btn", "btn-delete");
//       deleteBtn.addEventListener("click", () => deleteExpense(exp.id));

//       actionsTd.appendChild(editBtn);
//       actionsTd.appendChild(deleteBtn);

//       row.appendChild(dateTd);
//       row.appendChild(amountTd);
//       row.appendChild(categoryTd);
//       row.appendChild(noteTd);
//       row.appendChild(actionsTd);

//       expenseTableBody.appendChild(row);

//       total += exp.amount;
//     }
//   });

//   totalAmountSpan.textContent = total.toFixed(2);
// }

// // ================== EDIT / DELETE ==================
// function startEdit(id) {
//   const exp = expenses.find(e => e.id === id);
//   if (!exp) return;

//   document.getElementById("date").value = exp.date;
//   document.getElementById("amount").value = exp.amount;
//   document.getElementById("category").value = exp.category;
//   document.getElementById("note").value = exp.note || "";

//   editingId = id;
// }

// function deleteExpense(id) {
//   if (!confirm("Delete this expense?")) return;
//   expenses = expenses.filter(e => e.id !== id);
//   saveExpenses();
//   renderExpenses();
// }

// // ================== FORM SUBMIT ==================
// expenseForm.addEventListener("submit", e => {
//   e.preventDefault();

//   const date = document.getElementById("date").value;
//   const amount = parseFloat(document.getElementById("amount").value);
//   const category = document.getElementById("category").value.trim();
//   const note = document.getElementById("note").value.trim();

//   if (!date || isNaN(amount) || !category) {
//     alert("Please fill date, amount, and category.");
//     return;
//   }

//   if (editingId === null) {
//     // New expense
//     const newExpense = {
//       id: Date.now(),
//       date,
//       amount,
//       category,
//       note
//     };
//     expenses.push(newExpense);
//   } else {
//     // Update existing
//     const index = expenses.findIndex(e => e.id === editingId);
//     if (index !== -1) {
//       expenses[index] = { id: editingId, date, amount, category, note };
//     }
//     editingId = null;
//   }

//   saveExpenses();
//   renderExpenses();
//   expenseForm.reset();
// });

// // ================== MONTH FILTER CHANGE ==================
// monthFilterInput.addEventListener("change", () => {
//   renderExpenses();
//   updateSelectedMonthUI();
// });

// // ================== THEME TOGGLE ==================
// function applyTheme(theme) {
//   if (theme === "dark") {
//     document.body.classList.add("dark-mode");
//   } else {
//     document.body.classList.remove("dark-mode");
//   }
// }

// // Apply saved theme on load
// const savedTheme = localStorage.getItem(THEME_KEY) || "light";
// applyTheme(savedTheme);

// // Toggle theme on icon click
// if (themeToggleBtn) {
//   themeToggleBtn.addEventListener("click", () => {
//     const isDark = document.body.classList.contains("dark-mode");
//     const newTheme = isDark ? "light" : "dark";

//     console.log("Toggling theme to:", newTheme); // for debugging

//     applyTheme(newTheme);
//     localStorage.setItem(THEME_KEY, newTheme);
//   });
// }

// // ================== INITIAL CALLS ==================
// setDefaultMonth();
// renderExpenses();
// startAnimeSlideshow();
console.log("JS loaded");

// ========== DOM ELEMENTS ==========
const expenseForm = document.getElementById("expenseForm");
const expenseTableBody = document.getElementById("expenseTableBody");
const totalAmountSpan = document.getElementById("totalAmount");
const monthFilterInput = document.getElementById("monthFilter");
const animeHero = document.getElementById("animeHero");
const themeToggleBtn = document.getElementById("themeToggle");
const selectedMonthText = document.getElementById("selectedMonthText");

// ========== KEYS ==========
const STORAGE_KEY = "my_expenses";
const THEME_KEY = "expense_theme";

// ========== STATE ==========
let expenses = loadExpenses();
let editingId = null;

// ========== ANIME BACKGROUNDS ==========
const animeBackgrounds = [
  "onepiece.jpg",
  "lookism.jpg",
  "bluelock.jpg",
  "jjk.jpg",
  "demonslayer.jpg"
];
let currentAnimeIndex = 0;

// ========== ANIME SLIDESHOW ==========
function setAnimeBackground(index) {
  if (!animeHero) return;
  animeHero.style.backgroundImage = `url("${animeBackgrounds[index]}")`;
}

function startAnimeSlideshow() {
  if (!animeHero || animeBackgrounds.length === 0) return;
  setAnimeBackground(currentAnimeIndex);
  setInterval(() => {
    currentAnimeIndex = (currentAnimeIndex + 1) % animeBackgrounds.length;
    setAnimeBackground(currentAnimeIndex);
  }, 5000);
}

// ========== LOCAL STORAGE ==========
function loadExpenses() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error parsing expenses:", e);
    return [];
  }
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// ========== MONTH LABEL UI ==========
function formatMonthLabel(value) {
  if (!value) return "All months";

  const [year, month] = value.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const mIndex = Number(month) - 1;
  if (mIndex < 0 || mIndex > 11) return value;

  return `${monthNames[mIndex]} ${year}`;
}

function updateSelectedMonthUI() {
  if (!selectedMonthText) return;
  selectedMonthText.textContent = formatMonthLabel(monthFilterInput.value);
}

// ========== SET DEFAULT MONTH + RENDER ==========
function setDefaultMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  monthFilterInput.value = `${year}-${month}`;
  updateSelectedMonthUI();
}

function renderExpenses() {
  const selectedMonth = monthFilterInput.value; // "YYYY-MM"
  expenseTableBody.innerHTML = "";
  let total = 0;

  expenses.forEach(exp => {
    const expenseMonth = exp.date.slice(0, 7);
    if (expenseMonth === selectedMonth) {
      const row = document.createElement("tr");

      const dateTd = document.createElement("td");
      const amountTd = document.createElement("td");
      const categoryTd = document.createElement("td");
      const noteTd = document.createElement("td");
      const actionsTd = document.createElement("td");

      dateTd.textContent = exp.date;
      amountTd.textContent = exp.amount.toFixed(2);
      categoryTd.textContent = exp.category;
      noteTd.textContent = exp.note || "-";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("btn", "btn-edit");
      editBtn.addEventListener("click", () => startEdit(exp.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn", "btn-delete");
      deleteBtn.addEventListener("click", () => deleteExpense(exp.id));

      actionsTd.appendChild(editBtn);
      actionsTd.appendChild(deleteBtn);

      row.appendChild(dateTd);
      row.appendChild(amountTd);
      row.appendChild(categoryTd);
      row.appendChild(noteTd);
      row.appendChild(actionsTd);

      expenseTableBody.appendChild(row);
      total += exp.amount;
    }
  });

  totalAmountSpan.textContent = total.toFixed(2);
}

// ========== EDIT / DELETE ==========
function startEdit(id) {
  const exp = expenses.find(e => e.id === id);
  if (!exp) return;

  document.getElementById("date").value = exp.date;
  document.getElementById("amount").value = exp.amount;
  document.getElementById("category").value = exp.category;
  document.getElementById("note").value = exp.note || "";

  editingId = id;
}

function deleteExpense(id) {
  if (!confirm("Delete this expense?")) return;
  expenses = expenses.filter(e => e.id !== id);
  saveExpenses();
  renderExpenses();
}

// ========== FORM SUBMIT ==========
expenseForm.addEventListener("submit", e => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value.trim();
  const note = document.getElementById("note").value.trim();

  if (!date || isNaN(amount) || !category) {
    alert("Please fill date, amount, and category.");
    return;
  }

  if (editingId === null) {
    const newExpense = { id: Date.now(), date, amount, category, note };
    expenses.push(newExpense);
  } else {
    const index = expenses.findIndex(e => e.id === editingId);
    if (index !== -1) {
      expenses[index] = { id: editingId, date, amount, category, note };
    }
    editingId = null;
  }

  saveExpenses();
  renderExpenses();
  expenseForm.reset();
});

// ========== MONTH CHANGE ==========
monthFilterInput.addEventListener("change", () => {
  renderExpenses();
  updateSelectedMonthUI();
});

// ========== THEME TOGGLE ==========
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

const savedTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? "light" : "dark";

    console.log("Toggling theme to:", newTheme);

    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
}

// ========== INITIAL CALLS ==========
setDefaultMonth();
renderExpenses();
startAnimeSlideshow();
