const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const locations = [
  { name: 'Fort Myers', lat: 26.6406, lng: -81.8723 },
  { name: 'Cape Coral', lat: 26.5629, lng: -81.9495 },
  { name: 'North Fort Myers', lat: 26.6673, lng: -81.8801 },
  { name: 'Lehigh Acres', lat: 26.6253, lng: -81.6248 },
  { name: 'Estero', lat: 26.4381, lng: -81.8068 },
  { name: 'San Carlos Park', lat: 26.4673, lng: -81.8015 },
  { name: 'Bonita Springs', lat: 26.3398, lng: -81.7787 },
  { name: 'Iona', lat: 26.5204, lng: -81.9634 },
  { name: 'Alva', lat: 26.7156, lng: -81.6101 },
  { name: 'Fort Myers Beach', lat: 26.4520, lng: -81.9481 }
];

const map = L.map('map', { scrollWheelZoom: false }).setView([26.572, -81.82], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const serviceCircle = L.circle([26.6406, -81.8723], {
  radius: 52000,
  color: '#1497e8',
  fillColor: '#1497e8',
  fillOpacity: 0.07,
  weight: 2,
  dashArray: '8 8'
}).addTo(map).bindPopup('Approximate service radius. Availability depends on traffic, schedule, and job type.');

const chipContainer = document.getElementById('city-chips');
locations.forEach(location => {
  const marker = L.marker([location.lat, location.lng]).addTo(map).bindPopup(`<strong>${location.name}</strong><br>Common service area`);
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'city-chip';
  chip.textContent = location.name;
  chip.addEventListener('click', () => {
    map.flyTo([location.lat, location.lng], 13, { duration: 0.8 });
    marker.openPopup();
  });
  chipContainer.appendChild(chip);
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Service Request - ${data.get('name')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Phone: ${data.get('phone')}
Email: ${data.get('email') || 'Not provided'}
Address: ${data.get('address')}
Appliance / Request: ${data.get('appliance')}
Brand: ${data.get('brand') || 'Not provided'}

Reason for contacting:
${data.get('reason')}`
  );
  window.location.href = `mailto:Contact@SWFLPheonix.net?subject=${subject}&body=${body}`;
});
