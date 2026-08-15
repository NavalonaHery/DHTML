document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("matrice");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Récupération de l'ensemble des inputs du formulaire
        const inputs = Array.from(form.querySelectorAll("input[type='text']"));
        
        // Extraction des valeurs coefficient/constante de la matrice 3x4
        const a11 = parseFloat(inputs[0].value) || 0;
        const a12 = parseFloat(inputs[1].value) || 0;
        const a13 = parseFloat(inputs[2].value) || 0;
        const b1  = parseFloat(inputs[3].value) || 0;

        const a21 = parseFloat(inputs[4].value) || 0;
        const a22 = parseFloat(inputs[5].value) || 0;
        const a23 = parseFloat(inputs[6].value) || 0;
        const b2  = parseFloat(inputs[7].value) || 0;

        const a31 = parseFloat(inputs[8].value) || 0;
        const a32 = parseFloat(inputs[9].value) || 0;
        const a33 = parseFloat(inputs[10].value) || 0;
        const b3  = parseFloat(inputs[11].value) || 0;

        // Fonction pour calculer le déterminant 3x3 (Règle de Sarrus)
        function det(m) {
            return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
                 - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
                 + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
        }

        const D = det([
            [a11, a12, a13],
            [a21, a22, a23],
            [a31, a32, a33]
        ]);

        // Champs d'affichage du résultat
        const resX1 = inputs[12];
        const resX2 = inputs[13];
        const resX3 = inputs[14];

        if (D === 0) {
            alert("Le déterminant principal est nul. Le système n'a pas de solution unique par Cramer.");
            resX1.value = "N/A";
            resX2.value = "N/A";
            resX3.value = "N/A";
            return;
        }

        const Dx = det([
            [b1, a12, a13],
            [b2, a22, a23],
            [b3, a32, a33]
        ]);

        const Dy = det([
            [a11, b1, a13],
            [a21, b2, a23],
            [a31, b3, a33]
        ]);

        const Dz = det([
            [a11, a12, b1],
            [a21, a22, b2],
            [a31, a32, b3]
        ]);

        resX1.value = (Dx / D).toFixed(2);
        resX2.value = (Dy / D).toFixed(2);
        resX3.value = (Dz / D).toFixed(2);
    });
});