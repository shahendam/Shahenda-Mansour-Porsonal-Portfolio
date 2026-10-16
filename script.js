document.addEventListener("DOMContentLoaded", function () {

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = "© " + new Date().getFullYear();
    }

    const navbar = document.getElementById("mainNavbar");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                navbar &&
                navbar.classList.contains("show") &&
                window.bootstrap
            ) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(navbar);
                collapse.hide();
            }
        });
    });

    const elementsToReveal = document.querySelectorAll(
        ".section-heading, .skill-card, .project-card, " +
        ".education-card, .about-visual, .about-text, .contact-box"
    );

    elementsToReveal.forEach(function (element) {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        elementsToReveal.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        elementsToReveal.forEach(function (element) {
            element.classList.add("show");
        });
    }

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {
        let currentSection = "home";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + currentSection
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

});