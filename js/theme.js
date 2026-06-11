// theme.js — Dark/Light mode toggle with localStorage persistence

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  
  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      
      if (currentTheme === "light") {
        root.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("portfolio-theme", "light");
      }

      // Add a ripple animation to the toggle
      toggle.classList.add("theme-toggle-animating");
      setTimeout(() => {
        toggle.classList.remove("theme-toggle-animating");
      }, 500);
    });
  }
});
