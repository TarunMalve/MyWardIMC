const complaintTemplates = [
  { title: "Litter Bin Availability", desc: "Inadequate or missing litter bins in public stretches and markets." },
  { title: "Red Spots", desc: "Frequently dirty patches requiring recurring cleanup and monitoring." },
  { title: "Garbage Vulnerable Points", desc: "Chronic dumping points needing fencing, signage and surveillance." },
  { title: "Bulk Waste Handling", desc: "Hospitals, schools and institutions require strict source-level segregation." },
  { title: "C&D Waste", desc: "Construction debris blocking roads, drains, and pedestrian areas." },
  { title: "Public Toilet Hygiene", desc: "Unhygienic conditions and poor maintenance in selected locations." },
  { title: "Sewage & SWD Issues", desc: "Overflow, chokage, and delayed desilting in drain network." },
  { title: "Back Lane Cleanliness", desc: "Irregular cleaning in inner lanes and dense neighborhood pockets." }
];

const suggestionTemplates = [
  { title: "3R + Decomposition", desc: "Promote reduce, reuse, recycle and in-house wet waste composting at scale." },
  { title: "Sanitation Drives", desc: "Run school/market competitions and awareness campaigns with ward-level rewards." },
  { title: "Road & Lane Beautification", desc: "Improve aesthetics through planned footpath repairs, greenery and painting." },
  { title: "Smart Monitoring", desc: "GPS-based garbage vehicle tracking and issue closure dashboard for citizens." },
  { title: "Drainage Reforms", desc: "Scheduled sewer chamber checks and pre-monsoon storm drain desilting." },
  { title: "Public Space Upgrades", desc: "Beautify bus stands, railway approaches, and bridges for better civic experience." }
];

const heroMetrics = [
  ["Resolved Complaints", "82%"],
  ["Door-to-Door Collection", "94%"],
  ["Public Toilets Rated Clean", "76%"],
  ["Segregating Households", "68%"]
];

const wardStats = [
  ["Households", "12,840"],
  ["Colonies / Mohallas", "36"],
  ["Public Toilets", "21"],
  ["Litter Bins", "340"],
  ["Gardens", "14"],
  ["Hospitals & Clinics", "19"],
  ["Schools / Colleges", "42"],
  ["Govt. Offices", "11"],
  ["Water Tanks", "7"],
  ["Door-to-Door Vehicles", "18"],
  ["Drainage Hotspots", "9"],
  ["Green Waste Collection Points", "5"]
];

const comparisons = [
  ["Door-to-Door Collection", "94%", "98%", "4%"],
  ["Household Segregation", "68%", "90%", "22%"],
  ["Public Toilet Cleanliness", "76%", "95%", "19%"],
  ["Red Spot Elimination", "71%", "93%", "22%"],
  ["Complaint Closure (within 72h)", "82%", "96%", "14%"]
];

const services = [
  { title: "Ward Helpline", desc: "1800-313-IMC · 6 AM to 10 PM civic support desk." },
  { title: "Sanitation Supervisor", desc: "Escalation for unresolved cleanliness complaints after 72 hours." },
  { title: "Water Supply Control", desc: "Report low pressure, leakages, and tanker requirements." },
  { title: "Drainage Emergency", desc: "Monsoon overflow, chamber blockage, and urgent SWD cleaning." },
  { title: "Public Toilet Cell", desc: "Maintenance and hygiene escalation for public washroom assets." },
  { title: "Electrical Streetlight Team", desc: "Fault reporting for dark spots and unsafe lighting points." }
];

const actionTimeline = [
  "Complaint submitted by citizen",
  "Ward desk verifies location and assigns field team",
  "Action initiated and status shared within 24 hours",
  "Closure attempt with citizen confirmation",
  "Escalation to zonal officer if unresolved within SLA"
];

const COMPLAINT_STORAGE_KEY = "mywardimc_complaints";
const SUGGESTION_STORAGE_KEY = "mywardimc_suggestions";

function readRecords(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function writeRecords(storageKey, data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function renderCards(list, targetId) {
  const target = document.getElementById(targetId);
  target.innerHTML = list
    .map(
      (item) => `
      <article class="card">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </article>
    `
    )
    .join("");
}

function renderHeroMetrics() {
  const root = document.getElementById("heroMetrics");
  root.innerHTML = heroMetrics
    .map(
      ([label, value]) => `
      <article>
        <p>${label}</p>
        <h4>${value}</h4>
      </article>
    `
    )
    .join("");
}

function renderStats() {
  const root = document.getElementById("wardStats");
  root.innerHTML = wardStats
    .map(
      ([label, value]) => `
      <article class="stat">
        <p>${label}</p>
        <h4>${value}</h4>
      </article>
    `
    )
    .join("");
}

function renderComparison() {
  const table = document.getElementById("comparisonTable");
  table.innerHTML = comparisons
    .map(
      ([metric, myWard, bestWard, gap]) => `
      <tr>
        <td>${metric}</td>
        <td>${myWard}</td>
        <td>${bestWard}</td>
        <td>${gap}</td>
      </tr>
    `
    )
    .join("");
}

function renderTimeline() {
  const root = document.getElementById("actionTimeline");
  root.innerHTML = actionTimeline.map((step) => `<li>${step}</li>`).join("");
}

function renderComplaintRecords() {
  const root = document.getElementById("complaintRecords");
  const records = readRecords(COMPLAINT_STORAGE_KEY).slice().reverse();

  if (!records.length) {
    root.innerHTML = '<p class="empty-text">No complaint submitted yet. Your records will appear here.</p>';
    return;
  }

  root.innerHTML = records
    .map(
      (item) => `
      <article class="record-item">
        <p class="record-title">${item.issueType} · ${item.priority}</p>
        <p class="record-meta">Location: ${item.location}</p>
        <p class="record-meta">${item.details}</p>
        <p class="record-meta">Submitted: ${new Date(item.submittedAt).toLocaleString()}</p>
        <span class="status-pill">${item.status}</span>
      </article>
    `
    )
    .join("");
}

function renderSuggestionRecords() {
  const root = document.getElementById("suggestionRecords");
  const records = readRecords(SUGGESTION_STORAGE_KEY).slice().reverse();

  if (!records.length) {
    root.innerHTML = '<p class="empty-text">No citizen suggestion yet. Submitted ideas will appear here.</p>';
    return;
  }

  root.innerHTML = records
    .map(
      (item) => `
      <article class="record-item">
        <p class="record-title">${item.title}</p>
        <p class="record-meta">${item.details}</p>
        <p class="record-meta">Submitted: ${new Date(item.submittedAt).toLocaleString()}</p>
      </article>
    `
    )
    .join("");
}

function setupComplaintForm() {
  const typeSelect = document.getElementById("issueType");
  const prioritySelect = document.getElementById("priority");
  const form = document.getElementById("complaintForm");
  const formMessage = document.getElementById("formMessage");
  const clearButton = document.getElementById("clearComplaints");

  complaintTemplates.forEach(({ title }) => {
    const option = document.createElement("option");
    option.value = title;
    option.textContent = title;
    typeSelect.appendChild(option);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const entry = {
      issueType: typeSelect.value,
      priority: prioritySelect.value,
      location: document.getElementById("location").value.trim(),
      details: document.getElementById("details").value.trim(),
      status: "Submitted",
      submittedAt: new Date().toISOString()
    };

    const existing = readRecords(COMPLAINT_STORAGE_KEY);
    existing.push(entry);
    writeRecords(COMPLAINT_STORAGE_KEY, existing);

    form.reset();
    formMessage.textContent = "Complaint submitted successfully. IMC ward desk can review it from portal records.";
    renderComplaintRecords();
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem(COMPLAINT_STORAGE_KEY);
    renderComplaintRecords();
    formMessage.textContent = "Complaint records cleared from this browser.";
  });
}

function setupSuggestionForm() {
  const form = document.getElementById("suggestionForm");
  const message = document.getElementById("suggestionMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const entry = {
      title: document.getElementById("suggestionTitle").value.trim(),
      details: document.getElementById("suggestionDetails").value.trim(),
      submittedAt: new Date().toISOString()
    };

    const existing = readRecords(SUGGESTION_STORAGE_KEY);
    existing.push(entry);
    writeRecords(SUGGESTION_STORAGE_KEY, existing);

    form.reset();
    message.textContent = "Suggestion submitted. Thank you for improving your ward.";
    renderSuggestionRecords();
  });
}

renderHeroMetrics();
renderCards(complaintTemplates, "complaintGrid");
renderCards(suggestionTemplates, "suggestionGrid");
renderCards(services, "serviceGrid");
renderStats();
renderComparison();
renderTimeline();
renderComplaintRecords();
renderSuggestionRecords();
setupComplaintForm();
setupSuggestionForm();
