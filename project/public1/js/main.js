
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("/sw.js");
    } catch (err) {
      console.error("Service worker registration failed:", err);
    }
  });
} 

//Install button (PWA)
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.querySelector(".download-btn");
  if (btn) btn.style.display = "inline-flex";
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;

  const btn = document.querySelector(".download-btn");
  if (btn) btn.style.display = "none";
});

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".download-btn");
  if (!btn) return;

  if (!deferredPrompt) {
    alert("Install is not available yet. Try Chrome on Android, then refresh the page.");
    return;
  }

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;

  btn.style.display = "none";
});
