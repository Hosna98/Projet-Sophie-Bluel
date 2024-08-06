

    const login = document.getElementById("login")
    const logout = document.getElementById("logout")



// Fonction pour récupérer les travaux depuis l'API
async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            console.log("Erreur dans la récupération des travaux");
            return [];
        }
        const responseJson = await response.json();
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







// Fonction pour récupérer les catégories depuis l'API
async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) {
            console.log("Erreur dans la récupération des catégories");
            return [];
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        return [];
    }
}

// Fonction pour afficher les boutons de catégories
async function displayButtons(works) {
    const categories = await getCategories();
    const filtres = document.getElementById("categories-menu"); // Sélectionner l'élément du menu dans votre HTML

    if (!filtres) {
        console.error("Menu des catégories non trouvé");
        return;
    }

    // Créer un bouton "Tous"
    const allBtn = document.createElement("button");
    allBtn.id = "all";
    allBtn.textContent = "Tous";
    allBtn.addEventListener('click', () => {
        console.log(works); // Afficher les travaux dans la console
        displayWorks(works);
    });
    filtres.appendChild(allBtn);

    // Créer des boutons pour chaque catégorie
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        btn.addEventListener('click', () => {
            const filteredWorks = works.filter(work => work.categoryId === category.id);
            console.log(filteredWorks); // Afficher les travaux filtrés dans la console
            displayWorks(filteredWorks);
        });
        filtres.appendChild(btn);
    });
}

// Appeler la fonction pour afficher les boutons après le chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
    const works = await getWorks();
    if (works.length > 0) { // Vérifier que des travaux ont bien été récupérés
        displayButtons(works);
        displayWorks(works); // Afficher tous les travaux par défaut
    } else {
        console.log("Aucun travail récupéré");
    }
});

    const token = sessionStorage.getItem("token");
   //Partie ou l'utilisateur et conecté
   document.addEventListener("DOMContentLoaded", () => {
   
    const categoriesMenu = document.getElementById("categories-menu");
    const logBtn = document.getElementById("logBtn");
  
    if (token) {
        // Masquer le menu des catégories
        if (categoriesMenu) {
            categoriesMenu.style.display = "none";
        }
  
        // Changer le bouton de login en logout
        if (logBtn) {
            logBtn.textContent = "logout";
            logBtn.href = "#";
            logBtn.addEventListener("click", () => {
                sessionStorage.removeItem("token");
                window.location.replace("index.html");
            });
        }
      
      // Ajouter une barre en tête de page avec "Mode édition"
    const body = document.querySelector("body");
    const topMenu = document.createElement("div");
    topMenu.className = "topMenu";

    const editMode = document.createElement("p");
    editMode.innerHTML = `<i class="fas fa-pen-to-square"></i> Mode édition`;

    topMenu.append(editMode);
    body.insertAdjacentElement("afterbegin", topMenu);
  
      // Créer et insérer le bouton d'édition uniquement si l'utilisateur est connecté
    const editBtn = `<p class="editBtn"><i class="fa-regular fa-pen-to-square"></i>Modifier</p>`;
    const portfolioHeader = document.querySelector("#portfolio h2");

    if (portfolioHeader) {
      portfolioHeader.insertAdjacentHTML("afterend", editBtn);

    
} 
  }
      
});
