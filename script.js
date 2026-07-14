
document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const locations = [
  ['Fort Myers', 26.6406, -81.8723],
  ['Cape Coral', 26.5629, -81.9495],
  ['North Fort Myers', 26.6673, -81.8801],
  ['Lehigh Acres', 26.6253, -81.6248],
  ['San Carlos Park', 26.4673, -81.8015],
  ['Estero', 26.4381, -81.8068],
  ['Iona', 26.5204, -81.9631],
  ['Alva', 26.7156, -81.6101],
  ['Fort Myers Beach', 26.4520, -81.9481],
  ['Bonita Springs', 26.3398, -81.7787]
];

const map = L.map('map', {scrollWheelZoom:false}).setView([26.58, -81.82], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const bounds = [];
locations.forEach(([name, lat, lng]) => {
  L.marker([lat, lng]).addTo(map).bindPopup(`<strong>${name}</strong><br>Pheonix Home Services area`);
  bounds.push([lat, lng]);
});
L.circle([26.6406, -81.8723], {
  radius: 52000,
  color: '#f5a623',
  fillColor: '#f5a623',
  fillOpacity: 0.06,
  weight: 2
}).addTo(map);
map.fitBounds(bounds, {padding:[28,28]});

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const reason = document.getElementById('reason').value;
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Website request: ${reason || 'General inquiry'}`);
  const body = encodeURIComponent(
`Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address}
Reason: ${reason}

Message:
${message}`
  );

  window.location.href = `mailto:Contact@SWFLPheonix.net?subject=${subject}&body=${body}`;
});
