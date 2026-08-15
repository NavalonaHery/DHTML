document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("tbody tr");
    const dataRows = Array.from(rows).slice(0, 4);
    let chartInstance = null;

    function recalculer() {
        let totalQuantite = 0;
        let totalMontant = 0;
        let totalPrix = 0;
        const montantArray = []; // Stocke les montants au lieu des prix

        // 1. Calcul dynamique des montants par ligne
        dataRows.forEach(row => {
            const inputQt = row.querySelector(".quantite-input");
            const inputPrix = row.querySelector(".prix-input");
            const inputMontant = row.cells[3].querySelector("input");

            const quantite = parseFloat(inputQt ? inputQt.value : 0) || 0;
            const prix = parseFloat(inputPrix ? inputPrix.value : 0) || 0;
            const montant = quantite * prix;

            if (inputMontant) {
                inputMontant.value = montant + " Ar";
            }

            totalQuantite += quantite;
            totalMontant += montant;
            totalPrix += prix;

            montantArray.push(montant); // Ajout du montant dans le tableau
        });

        // 2. Mise à jour de la ligne TOTAL
        const totalRow = rows[rows.length - 1].querySelectorAll("td");
        const inputTotalQt = totalRow[1].querySelector("input");
        const inputTotalPrix = totalRow[2].querySelector("input");
        const inputTotalMontant = totalRow[3].querySelector("input");

        if (inputTotalQt) inputTotalQt.value = totalQuantite;
        if (inputTotalPrix) inputTotalPrix.value = totalPrix;
        if (inputTotalMontant) inputTotalMontant.value = totalMontant + " Ar";

        // 3. Calcul des statistiques sur le MONTANT (Min, Moyen, Max)
        const montantMin = montantArray.length > 0 ? Math.min(...montantArray) : 0;
        const montantMax = montantArray.length > 0 ? Math.max(...montantArray) : 0;
        const montantMoyen = montantArray.length > 0 ? parseFloat((totalMontant / montantArray.length).toFixed(2)) : 0;

        const inputMin = document.getElementById("minimal-input");
        const inputMoyen = document.getElementById("moyen-input");
        const inputMax = document.getElementById("maximal-input");

        if (inputMin) inputMin.value = montantMin + " Ar";
        if (inputMoyen) inputMoyen.value = montantMoyen + " Ar";
        if (inputMax) inputMax.value = montantMax + " Ar";

        // 4. Mise à jour dynamique du graphique avec les montants
        updateChart(montantMin, montantMoyen, montantMax);
    }

    function updateChart(montantMin, montantMoyen, montantMax) {
        const ctx = document.getElementById("myChart");
        if (!ctx) return;

        if (chartInstance) {
            chartInstance.data.datasets[0].data = [montantMin, montantMoyen, montantMax];
            chartInstance.update();
        } else {
            chartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Montant Minimal", "Montant Moyen", "Montant Maximal"],
                    datasets: [{
                        label: "Montant en Ariary (Ar)",
                        data: [montantMin, montantMoyen, montantMax],
                        backgroundColor: [
                            "rgba(255, 145, 0, 0.7)",  
                            "rgba(255, 107, 0, 0.7)",  
                            "rgba(200, 50, 0, 0.7)"    
                        ],
                        borderColor: [
                            "rgba(255, 145, 0, 1)",
                            "rgba(255, 107, 0, 1)",
                            "rgba(200, 50, 0, 1)"
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Statistiques des Montants (Ar)',
                            color: '#f4f4f6'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: '#a0a0a8' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            ticks: { color: '#a0a0a8' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }
    }

    // Premier calcul au chargement
    recalculer();

    // Réactivité : recalcul à chaque saisie dans les champs
    document.querySelectorAll(".quantite-input, .prix-input").forEach(input => {
        input.addEventListener("input", recalculer);
    });
});