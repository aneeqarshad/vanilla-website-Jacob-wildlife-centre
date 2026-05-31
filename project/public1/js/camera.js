let stream = null;

const placeholder = document.getElementById("cameraPlaceholder");
const video = document.getElementById("video");
const photo = document.getElementById("photo");
const statusEl = document.getElementById("camStatus");

const startBtn = document.getElementById("startBtn");
const snapBtn = document.getElementById("snapBtn");
const stopBtn = document.getElementById("stopBtn");

function show(el) { el.style.display = "block"; }
function hide(el) { el.style.display = "none"; }

startBtn.addEventListener("click", async () => {
  statusEl.textContent = "Starting camera...";

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });

    video.srcObject = stream;
    hide(placeholder);
    show(video);
    hide(photo);

    snapBtn.disabled = false;
    stopBtn.disabled = false;

    statusEl.textContent = "Camera ready!";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Camera permission denied or not available.";
  }
});

snapBtn.addEventListener("click", () => {
  if (!stream) return;

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  photo.src = canvas.toDataURL("image/png");
  show(photo);

  statusEl.textContent = "Photo captured!";
});

stopBtn.addEventListener("click", () => {
  if (!stream) return;

  stream.getTracks().forEach(t => t.stop());
  stream = null;

  video.srcObject = null;
  hide(video);
  show(placeholder);

  snapBtn.disabled = true;
  stopBtn.disabled = true;

  statusEl.textContent = "Camera stopped.";
});
