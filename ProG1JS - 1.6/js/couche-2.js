document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("lelogo");
    
    // Éléments de la largeur
    const largeurRange = document.getElementById("largeur");
    const largeurNumber = document.getElementById("largeurNumber");
    
    // Éléments de la hauteur
    const hauteurRange = document.getElementById("hauteur");
    const hauteurNumber = document.getElementById("hauteurNumber");

    // Fonction de mise à jour de la largeur
    function updateWidth(value) {
        largeurRange.value = value;
        largeurNumber.value = value;
        if (img) img.style.width = value + "px";
    }

    // Fonction de mise à jour de la hauteur
    function updateHeight(value) {
        hauteurRange.value = value;
        hauteurNumber.value = value;
        if (img) img.style.height = value + "px";
    }

    // Écouteurs pour la largeur
    largeurRange.addEventListener("input", (e) => updateWidth(e.target.value));
    largeurNumber.addEventListener("input", (e) => updateWidth(e.target.value));

    // Écouteurs pour la hauteur
    hauteurRange.addEventListener("input", (e) => updateHeight(e.target.value));
    hauteurNumber.addEventListener("input", (e) => updateHeight(e.target.value));

    // Initialisation
    updateWidth(largeurRange.value);
    updateHeight(hauteurRange.value);
});