const centreLat = 53.5075;
const centreLon = -3.0605;

const map = L.map("map").setView([centreLat, centreLon], 16);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


L.marker([centreLat, centreLon])
  .addTo(map)
  .bindPopup("<b>Jacob Wildlife Centre</b><br>Centre location")
  .openPopup();

// Emoji icon maker
function emojiIcon(emoji) {
  return L.divIcon({
    className: "emoji-marker",
    html: `<div style="font-size:28px; line-height:28px;">${emoji}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
}

fetch("data/animals.json?v=3")
  .then(res => res.json())
  .then(animals => {
    animals.forEach(a => {
      if (a.lat && a.lon) {
        const icon = emojiIcon(a.emoji || "📍");

        L.marker([a.lat, a.lon], { icon })
          .addTo(map)
          .bindPopup(`<b>${a.name}</b><br>${a.emoji || ""}`);
      }
    });
  })
  .catch(err => console.error("Animals load error:", err));

const locateBtn = document.getElementById("locateBtn");

let userMarker = null;

locateBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported on this device.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const userLat = pos.coords.latitude;
      const userLon = pos.coords.longitude;

      if (userMarker) {
        map.removeLayer(userMarker);
      }

      userMarker = L.marker([userLat, userLon])
        .addTo(map)
        .bindPopup("<b>Your Location</b>")
        .openPopup();

      map.setView([userLat, userLon], 16);
    },
    (err) => {
  console.log("Geolocation error:", err);
  const statusEl = document.getElementById("locationStatus");
  if (statusEl) {
    statusEl.innerHTML =
      "Location permission denied. <br>Click the (i) icon next to the URL → Site settings → Location → Allow, then refresh.";
  }
},
    { enableHighAccuracy: true, timeout: 10000 }
  );
});
