document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments vidéo du panneau publicitaire
    const container = document.querySelector(".affichage .images");
    const elements = Array.from(container.children);
    
    if (elements.length === 0) return;

    // Ajustement des styles pour permettre la superposition (couches)
    container.style.position = "relative";
    container.style.display = "block";
    container.style.width = "700px";
    container.style.height = "350px";
    container.style.margin = "0 auto";

    elements.forEach((el, index) => {
        el.style.position = "absolute";
        el.style.top = "0";
        el.style.left = "0";
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.transition = "opacity 1s ease-in-out";
        el.style.opacity = index === 0 ? "1" : "0";
        el.style.zIndex = index === 0 ? "2" : "1";
    });

    let currentIndex = 0;
    const intervalleTemps = 10000; // Pas du temps (10 secondes)

    // Fonction effectuant la rotation des couches
    function tournerPanneau() {
        const nextIndex = (currentIndex + 1) % elements.length;

        // Réinitialisation des z-index et masquage de l'élément courant
        elements[currentIndex].style.opacity = "0";
        elements[currentIndex].style.zIndex = "1";

        // Affichage du nouvel élément de la suite
        elements[nextIndex].style.opacity = "1";
        elements[nextIndex].style.zIndex = "2";

        // Relance de la vidéo entrante si elle était en pause
        if (elements[nextIndex].tagName === "VIDEO") {
            elements[nextIndex].currentTime = 0;
            elements[nextIndex].play().catch(() => {});
        }

        currentIndex = nextIndex;
    }

    // Lancement de la rotation dynamique à chaque pas du temps
    setInterval(tournerPanneau, intervalleTemps);
});