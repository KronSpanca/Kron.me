
// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// CLOSE MENU AFTER CLICKING A LINK

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";

    });

});


// HEADER SCROLL EFFECT

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// SCROLL PROGRESS BAR

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;

});


// BACK TO TOP BUTTON

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 450) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// REVEAL ANIMATION

const revealElements = document.querySelectorAll(
    ".section-heading, .about-main, .info-card, .skill-card, .project-card, .service-card, .contact-copy, .contact-form"
);

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// ACTIVE NAVIGATION LINK

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navItems.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );

            });

        }

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => {

    sectionObserver.observe(section);

});


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// CONTACT FORM

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

// CHANGE THIS TO YOUR REAL EMAIL ADDRESS
const contactEmail = "YOUR_EMAIL@example.com";

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    if (!contactForm.checkValidity()) {

        contactForm.reportValidity();

        return;

    }

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        formMessage.textContent = "Please complete all fields.";

        return;

    }

    if (contactEmail === "YOUR_EMAIL@example.com") {

        formMessage.textContent =
            "Add your real email address in script.js first.";

        return;

    }

    const subject = encodeURIComponent(
        `Portfolio message from ${name}`
    );

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    formMessage.textContent =
        "Opening your email application...";

    window.location.href =
        `mailto:${contactEmail}?subject=${subject}&body=${body}`;

});
