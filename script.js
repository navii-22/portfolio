/* =========================
   THEME TOGGLE
========================= */
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector(".theme-toggle i");
    body.classList.toggle("dark");
    icon.setAttribute("data-feather", body.classList.contains("dark") ? "sun" : "moon");
    feather.replace();
}

/* =========================
   MOBILE MENU TOGGLE
========================= */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("active");
});

/* =========================
   SMOOTH SCROLL & AUTO-CLOSE MOBILE MENU
========================= */
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        }

        // Close mobile menu after clicking
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
    });
});

/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 100) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
});

/* =========================
   CERTIFICATE POPUP / ZOOM
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const selectors = [".cert-container img", ".timeline-content img", ".cert-card img"];
    const images = Array.from(document.querySelectorAll(selectors.join(","))).filter(Boolean);
    const overlay = document.getElementById("certZoomOverlay");
    const overlayImg = document.getElementById("certZoomImg");
    const overlayClose = document.getElementById("certZoomClose");

    if (!overlay || !overlayImg) return;

    function openZoom(src, alt = "") {
        overlayImg.src = src;
        overlayImg.alt = alt;
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    }

    function closeZoom() {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        setTimeout(() => overlayImg.removeAttribute("src"), 300);
    }

    images.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => openZoom(img.src, img.alt || "Certificate"));
        img.addEventListener("touchend", () => openZoom(img.src, img.alt || "Certificate"), {passive: true});
    });

    overlay.addEventListener("click", e => {
        if (e.target === overlay || e.target === overlayClose) closeZoom();
    });
    overlayClose.addEventListener("click", closeZoom);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && overlay.classList.contains("open")) closeZoom();
    });
});



/* SKILL CIRCLES ANIMATION */
const skillCircles = document.querySelectorAll(".skill-circle");

function animateSkills() {
    const windowBottom = window.innerHeight + window.scrollY;

    skillCircles.forEach(circle => {
        const circleTop = circle.offsetTop;
        const value = parseInt(circle.getAttribute("data-value"));
        const fill = circle.querySelectorAll(".fill");
        const inside = circle.querySelector(".inside-circle");

        if (windowBottom > circleTop + 50 && window.scrollY < circleTop + 200) {
            fill[0].style.transform = `rotate(0deg)`;
            fill[1].style.transform = `rotate(0deg)`;
            inside.textContent = "0%";

            let current = 0;
            const interval = setInterval(() => {
                if (current >= value) {
                    clearInterval(interval);
                    inside.textContent = value + "%";
                } else {
                    current++;
                    inside.textContent = current + "%";
                }
            }, 15);

            const degrees = (value / 100) * 360;
            setTimeout(() => {
                fill[0].style.transform = `rotate(${degrees}deg)`;
                fill[1].style.transform = `rotate(${degrees}deg)`;
            }, 50);
        }
    });
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);


