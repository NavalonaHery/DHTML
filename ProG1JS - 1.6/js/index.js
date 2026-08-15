document.addEventListener("DOMContentLoaded", () => {
    // 1. Mise en valeur du lien de navigation actif
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".link a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath || (currentPath === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("active");
        }
    });

    // 2. Animation d'interaction sur les images de présentations
    const images = document.querySelectorAll(".images img");
    images.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.05)";
            img.style.transition = "transform 0.3s ease";
        });
        img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)";
        });
    });
});