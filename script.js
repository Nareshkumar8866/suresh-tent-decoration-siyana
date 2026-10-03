
document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const header = document.getElementById("siteHeader");
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = navMenu.querySelectorAll("a");

    // Page loader
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 500);
    });

    // Header scroll effect
    function updateHeader() {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    // Mobile menu
    function closeMenu() {
        navMenu.classList.remove("open");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }

    menuBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuBtn.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Scroll reveal
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // Dynamic footer year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Close menu on Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

});
