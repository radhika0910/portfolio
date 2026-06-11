// preloader.js — Premium loading animation

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const barFill = document.getElementById("preloaderBarFill");
  
  if (!preloader || !barFill) return;

  // Prevent scrolling during preload
  document.body.style.overflow = "hidden";

  let progress = 0;
  const duration = 2200; // ms
  const startTime = Date.now();

  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    barFill.style.width = `${eased * 100}%`;

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      // Loading complete — dismiss preloader
      setTimeout(() => {
        preloader.classList.add("preloader-done");
        document.body.style.overflow = "";
        
        // Remove from DOM after animation completes
        setTimeout(() => {
          preloader.remove();
        }, 800);
      }, 300);
    }
  };

  requestAnimationFrame(updateProgress);
});
