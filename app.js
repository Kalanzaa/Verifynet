// Tab navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Fact-Checker mock
document.getElementById('verifyBtn').onclick = function() {
  const input = document.getElementById('claimInput').value.trim();
  const result = document.getElementById('verifyResult');
  if (!input) {
    result.textContent = "Please enter a claim or article.";
    result.className = "result-card warning";
    result.style.display = "block";
    return;
  }
  // Simulate AI response
  const score = Math.floor(Math.random() * 100) + 1;
  let msg, cls;
  if (score > 75) {
    msg = `Credibility Score: ${score}% ✅\nSource strength: High\nNo warnings.`;
    cls = "result-card success";
  } else if (score > 50) {
    msg = `Credibility Score: ${score}% ⚠️\nSource strength: Medium\nWarning: Inconclusive evidence.`;
    cls = "result-card warning";
  } else {
    msg = `Credibility Score: ${score}% ❌\nSource strength: Low\nWarning: Unreliable claim.`;
    cls = "result-card error";
  }
  result.textContent = msg;
  result.className = cls;
  result.style.display = "block";
};

// Tip Submission mock
document.getElementById('tipForm').onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('tipAck').textContent = "Your report was received securely. Thank you!";
  document.getElementById('tipAck').className = "result-card success";
  document.getElementById('tipAck').style.display = "block";
  setTimeout(() => {
    document.getElementById('tipAck').style.display = "none";
    document.getElementById('tipForm').reset();
  }, 2500);
};

// Crisis Map mock
let map;
function initMap() {
  map = L.map('mapContainer').setView([-1.286389, 36.817223], 6); // Nairobi
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Mock data
  const reports = [
    { type: 'flood', lat: -1.3, lng: 36.8, desc: 'Flooding in Nairobi', time: '2025-06-18', verified: true },
    { type: 'protest', lat: -0.4, lng: 36.9, desc: 'Protest in Nakuru', time: '2025-06-17', verified: false },
    { type: 'fire', lat: -1.5, lng: 37.1, desc: 'Fire in Machakos', time: '2025-06-16', verified: true }
  ];

  function renderPins() {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });
    const type = document.getElementById('crisisTypeFilter').value;
    const date = document.getElementById('dateFilter').value;
    const verifiedOnly = document.getElementById('verifiedOnly').checked;
    reports.forEach(r => {
      if ((type && r.type !== type) || (date && r.time !== date) || (verifiedOnly && !r.verified)) return;
      const marker = L.marker([r.lat, r.lng]).addTo(map);
      marker.bindPopup(`<b>${r.type.toUpperCase()}</b><br>${r.desc}<br>${r.time}${r.verified ? '<br>✅ Verified' : ''}`);
    });
  }
  document.getElementById('crisisTypeFilter').onchange = renderPins;
  document.getElementById('dateFilter').onchange = renderPins;
  document.getElementById('verifiedOnly').onchange = renderPins;
  renderPins();
}
if (document.getElementById('mapContainer')) {
  setTimeout(initMap, 500); // Wait for tab to show
}