// =====================================================
// MIDTERM STARTER: script.js
// =====================================================

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // ---- B1: DARK MODE TOGGLE ----
    const darkModeToggle = document.getElementById("darkModeToggle");
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        if (savedTheme === "dark") htmlEl.classList.add("dark");
        else htmlEl.classList.remove("dark");
    }

    darkModeToggle.addEventListener("click", () => {
        htmlEl.classList.toggle("dark");
        localStorage.setItem("theme", htmlEl.classList.contains("dark") ? "dark" : "light");
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        menu.classList.toggle("hidden");
    });

    // ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----
    const introTl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 }
        // I chose the power3.out easing for a fast, snappy entry that settles smoothly.
    });

    introTl
        .from("header", { y: -50, opacity: 0 })
        .from("#home h1", { y: 30, opacity: 0 }, "-=0.4")
        .from(".hero-item", { y: 20, opacity: 0, stagger: 0.15 }, "-=0.3");

    // ---- D3: CLICK INTERACTION ----
    document.getElementById("replayBtn").addEventListener("click", () => {
        introTl.restart();
    });

    // ---- E1, E2, E3: SCROLL REVEALS, PROGRESS BAR, & REDUCED MOTION ----
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll progress bar scrub
        gsap.to("#progressBar", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

        // Section reveal on scroll
        const reveals = gsap.utils.toArray(".reveal");
        reveals.forEach((el) => {
            gsap.from(el, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
    });

    // Form Submit Simulation
    const bookingForm = document.getElementById("bookingForm");
    const formStatus = document.getElementById("formStatus");

    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        formStatus.textContent = "Thank you! Your request has been sent to Cyn Studio.";
        bookingForm.reset();
    });
});
