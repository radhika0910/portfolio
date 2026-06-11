// wow.js — Premium wow-factor interactions

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // 1. CUSTOM CURSOR
  // ==========================================
  const cursor = document.querySelector(".custom-cursor");
  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursor && cursorGlow && window.innerWidth > 1000) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor follow with lerp
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover detection for interactive elements
    const hoverTargets = document.querySelectorAll(
      "a, button, .menu-toggle-btn, .logo, .service-card-inner, .contact-button, .achievement-card, .nav-item"
    );
    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        cursorGlow.classList.add("hovering");
      });
      target.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        cursorGlow.classList.remove("hovering");
      });
    });

    // Hide default cursor
    document.body.style.cursor = "none";
    document.querySelectorAll("a, button").forEach((el) => {
      el.style.cursor = "none";
    });
  }

  // ==========================================
  // 2. HERO PARTICLES
  // ==========================================
  const particlesContainer = document.getElementById("heroParticles");

  if (particlesContainer) {
    const particleTypes = ["type-dot", "type-ring", "type-diamond"];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      particle.className = `hero-particle ${type}`;
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = 6 + Math.random() * 6 + "s";
      particlesContainer.appendChild(particle);
    }
  }

  // ==========================================
  // 3. ACHIEVEMENT COUNTER ANIMATION
  // ==========================================
  const achievementNumbers = document.querySelectorAll(".achievement-number");

  if (achievementNumbers.length > 0) {
    const animateCounter = (element) => {
      const target = parseInt(element.dataset.target);
      const suffix = element.dataset.suffix || "";
      const duration = 2000;
      const startTime = Date.now();

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        element.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      updateCounter();
    };

    // Trigger counter on scroll into view
    ScrollTrigger.create({
      trigger: ".achievements",
      start: "top 75%",
      once: true,
      onEnter: () => {
        achievementNumbers.forEach((el, index) => {
          setTimeout(() => animateCounter(el), index * 200);
        });
      },
    });

    // Also animate cards stagger on scroll
    gsap.from(".achievement-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".achievements",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  // ==========================================
  // 4. TECH MARQUEE PAUSE ON HOVER
  // ==========================================
  const marqueeTrack = document.querySelector(".marquee-track");
  if (marqueeTrack) {
    marqueeTrack.addEventListener("mouseenter", () => {
      marqueeTrack.style.animationPlayState = "paused";
    });
    marqueeTrack.addEventListener("mouseleave", () => {
      marqueeTrack.style.animationPlayState = "running";
    });
  }

  // ==========================================
  // 5. ABOUT SECTION TEXT REVEAL
  // ==========================================
  const aboutBio = document.querySelector(".about-hero-bio");
  if (aboutBio) {
    gsap.from(".about-hero-bio .ss", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-hero",
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".about-hero-bio .mn", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-hero",
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });
  }

  // ==========================================
  // 6. ACHIEVEMENTS HEADER REVEAL
  // ==========================================
  const achievementsHeader = document.querySelector(".achievements-header");
  if (achievementsHeader) {
    gsap.from(".achievements-header p", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".achievements",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".achievements-header h2", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".achievements",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }

  // ==========================================
  // 7. SERVICES HEADER PARALLAX TEXT
  // ==========================================
  if (window.innerWidth > 1000) {
    const servicesTitle = document.querySelector(".services-header-title");
    if (servicesTitle) {
      gsap.to(".services-header-title h1:first-child", {
        x: -50,
        scrollTrigger: {
          trigger: ".services-header",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".services-header-title h1:last-child", {
        x: 50,
        scrollTrigger: {
          trigger: ".services-header",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }

  // ==========================================
  // 8. MAGNETIC EFFECT ON CTA BUTTON
  // ==========================================
  const ctaButton = document.querySelector(".contact-button");
  if (ctaButton && window.innerWidth > 1000) {
    ctaButton.addEventListener("mousemove", (e) => {
      const rect = ctaButton.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(ctaButton, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    ctaButton.addEventListener("mouseleave", () => {
      gsap.to(ctaButton, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  }
});
