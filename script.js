const complaints = [
  { title: "Litter Bin Availability", desc: "Inadequate or missing litter bins in public stretches and markets." },
  { title: "Red Spots", desc: "Frequently dirty patches requiring recurring cleanup and monitoring." },
  { title: "Garbage Vulnerable Points", desc: "Chronic dumping points needing fencing, signage and surveillance." },
  { title: "Bulk Waste Handling", desc: "Hospitals, schools and institutions require strict source-level segregation." },
  { title: "C&D Waste", desc: "Construction debris blocking roads, drains, and pedestrian areas." },
  { title: "Public Toilet Hygiene", desc: "Unhygienic conditions and poor maintenance in selected locations." },
  { title: "Sewage & SWD Issues", desc: "Overflow, chokage, and delayed desilting in drain network." },
  { title: "Back Lane Cleanliness", desc: "Irregular cleaning in inner lanes and dense neighborhood pockets." }
];

const suggestions = [
  { title: "3R + Decomposition", desc: "Promote reduce, reuse, recycle and in-house wet waste composting at scale." },
  { title: "Sanitation Drives", desc: "Run school/market competitions and awareness campaigns with ward-level rewards." },
  { title: "Road & Lane Beautification", desc: "Improve aesthetics through planned footpath repairs, greenery and painting." },
  { title: "Smart Monitoring", desc: "GPS-based garbage vehicle tracking and issue closure dashboard for citizens." },
  { title: "Drainage Reforms", desc: "Scheduled sewer chamber checks and pre-monsoon storm drain desilting." },
  { title: "Public Space Upgrades", desc: "Beautify bus stands, railway approaches, and bridges for better civic experience." }
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

function setupComplaintForm() {
  const typeSelect = document.getElementById("issueType");
  const form = document.getElementById("complaintForm");
  const formMessage = document.getElementById("formMessage");

  complaints.forEach(({ title }) => {
    const option = document.createElement("option");
    option.value = title;
    option.textContent = title;
    typeSelect.appendChild(option);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entry = {
      issueType: typeSelect.value,
      location: document.getElementById("location").value.trim(),
      details: document.getElementById("details").value.trim(),
      submittedAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("mywardimc_complaints") || "[]");
    existing.push(entry);
    localStorage.setItem("mywardimc_complaints", JSON.stringify(existing));

    form.reset();
    formMessage.textContent = "Complaint submitted successfully. IMC ward desk can review it from portal records.";
  });
}

renderCards(complaints, "complaintGrid");
renderCards(suggestions, "suggestionGrid");
renderStats();
renderComparison();
setupComplaintForm();
