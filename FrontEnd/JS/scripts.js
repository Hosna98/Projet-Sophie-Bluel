




// Fonction pour récupérer les travaux depuis l'API
async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            console.log("Erreur dans la récupération des travaux");
            return [];
        }
        const responseJson = await response.json();
        console.log(responseJson); // Vérifiez la structure des données ici
        return responseJson;
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux:", error);
        return [];
    }
}

// Fonction pour créer un élément de travail
function createWorkElement(work) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    `;
    return figure;
}

// Fonction pour afficher les travaux
function displayWorks(works) {
    const gallery = document.getElementById('gallery'); // Sélectionner l'élément galerie dans votre HTML
    if (!gallery) {
        console.error("Galerie non trouvée");
        return;
    }
    gallery.innerHTML = ''; // Vider la galerie actuelle
    works.forEach(work => {
        const workElement = createWorkElement(work); // Créer un élément de travail pour chaque travail récupéré
        gallery.appendChild(workElement); // Ajouter l'élément de travail à la galerie
    });
}

// Appel des fonctions lorsque le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', async () => {
    const works = await getWorks();
    displayWorks(works);
});