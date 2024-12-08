// script.js
const apiKey = '6731b60f7ec248dba21dece24e29a3cd'; // mon clé API Spoonacular

async function rechercherRecettes() {
    const titre = document.getElementById("titre").value;
    const resultats = document.getElementById("recettes");
    resultats.innerHTML = ""; // Efface les anciens résultats

    try {
        // Appel à l'API Spoonacular
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${titre}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            data.results.forEach(async (recette) => {
                const recipeDetailsResponse = await fetch(`https://api.spoonacular.com/recipes/${recette.id}/information?apiKey=${apiKey}`);
                const recipeDetails = await recipeDetailsResponse.json();
                
                const div = document.createElement("div");
                div.className = "recette";
                div.innerHTML = `
                    <h2>${recipeDetails.title}</h2>
                    <img src="${recipeDetails.image}"alt="${recipeDetails.title}">
                    <p><strong>Ingrédients:</strong> ${recipeDetails.extendedIngredients.map(ing => ing.original).join(", ")}</p>
                    <p><strong>Instructions:</strong> ${recipeDetails.instructions || "Voir les instructions complètes <a href='${recipeDetails.sourceUrl}' target='_blank'>ici</a>"}</p>
                `;
                resultats.appendChild(div);
            });
        } else {
            resultats.innerHTML = "Aucune recette trouvée pour ce titre.";
        }
    } catch (error) {
        resultats.innerHTML = "Une erreur est survenue lors de la recherche des recettes.";
        console.error('Erreur:', error);
    }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    const titre = document.getElementById("titre");
    titre.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            rechercherRecettes();
        }
    });
});
