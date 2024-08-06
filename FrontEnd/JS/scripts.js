

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

     // Ajouter un événement clic au bouton d'édition
     document.querySelector(".editBtn").addEventListener("click", openModal);
} 
  }
      
});

// Sélection des éléments de la modale
const modal = document.querySelector(".modal");
const closeModalIcon = document.querySelector(".modalHeader .fa-xmark");
const gallery = document.querySelector("#modalGallery");

// Fonction pour ouvrir la modale
const openModal = function () {
   // Vérifie si l'utilisateur est connecté en vérifiant le token
   if (sessionStorage.getItem("token")) { 
    // Vérifie si l'élément modal existe 
     if (modal) {
       console.log("Ouverture de la modale"); // Message dans la console
       modal.style.display = "flex"; // Affiche la modale
     }
   }
 };



 // Ajouter un événement clic à l'icône de fermeture
if (closeModalIcon && modal) {// Vérifie si les éléments de l'icône de fermeture et de la modale existent
    closeModalIcon.addEventListener("click", () => {// Ajouter un événement clic à l'icône de fermeture
      modal.style.display = "none"; // Cache la modale
      console.log("Fermeture de la modale"); 
    });
  
  };
 
  // Ajouter un événement clic pour fermer la modale en cliquant en dehors du contenu
 if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target ==  modal) {
        modal.style.display = "none"; // Cache la modale
      }
    });
  };
 
  // Fonction pour afficher les photos dans la galerie de la modale
async function displayModalGallery() {
    if (modalGallery) {
      modalGallery.innerHTML = ""; // Vider la galerie actuelle dans la modale
      const works = await getWorks(); // Récupérer les travaux depuis l'API
      works.forEach(photos => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can"); // Ajout correct des classes
        trash.id = photos.id;
        img.src = photos.imageUrl; // Correction de img.scr à img.src
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        modalGallery.appendChild(figure); // Correction de works.appendChild(figure) à modalGallery.appendChild(figure)
      });
    }
  }displayModalGallery()
 

  
  // Fonction pour supprimer un travail
  async function deleteWork(workID) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workID}`, deleteRequest);
        if (!response.ok) {
            console.log("Erreur lors de la suppression du travail");
            return;
        }
        // Mise à jour de la galerie modale après suppression
        displayModalGallery();
    } catch (error) {
        console.error("Erreur lors de la suppression du travail:", error);
    }
  }
  
  // Fonction pour ajouter des écouteurs d'événements de suppression
  function addDeleteEventListeners() {
    const trashIcons = document.querySelectorAll(".fa-trash-can");
    trashIcons.forEach(icon => {
        icon.addEventListener("click", async () => {
            const workID = icon.id;
            await deleteWork(workID);
        });
    });
  }
  
  
  // Fonction pour afficher la galerie de la modale avec la fonctionnalité de suppression
  async function displayModalGallery() {
      const modalGallery = document.getElementById("modalGallery");
      if (modalGallery) {
          modalGallery.innerHTML = ""; // Vider la galerie actuelle
          const works = await getWorks(); // Récupérer les travaux depuis l'API
          works.forEach(work => {
              const figure = document.createElement("figure");
              const img = document.createElement("img");
              const span = document.createElement("span");
              const trash = document.createElement("i");
              trash.classList.add("fa-solid", "fa-trash-can");
              trash.id = work.id;
              img.src = work.imageUrl;
              img.alt = work.title;
              span.appendChild(trash);
              figure.appendChild(img);
              figure.appendChild(span);
              modalGallery.appendChild(figure);
          });
          addDeleteEventListeners(); // Ajouter les écouteurs d'événements après avoir ajouté les éléments
      }
    }
 



   //display add work form
   const openNewWorkForm = function (e) {
    if(e.target === document.querySelector("#addPictureBtn")){
      modalStep = 1;
      document.querySelector("#addPicture").style.display = "flex";
      document.querySelector("#editGallery").style.display = "none";
      document.querySelector("#labelPhoto").style.display = "flex";
      document.querySelector("#picturePreview").style.display = "none";
      
      document.getElementById("addPictureForm").reset();
      //<select> categories list 
      selectCategoryForm();
      //display preview
      pictureInput = document.querySelector("#photo");
      pictureInput.onchange = picturePreview;
      //events
      document.querySelector("#addPictureForm").onchange = changeSubmitBtnColor;
      document.addEventListener("click", closeModal);
      document.querySelector(".modalHeader .fa-arrow-left").addEventListener("click", openModal);
      document.removeEventListener("click", openNewWorkForm);
      document.removeEventListener("click", deleteBtn);
      document.addEventListener("click", newWorkFormSubmit);
    }
  }
  
  // Sélection des éléments de la modale 2
  const addPictureBtn = document.querySelector("#addPictureBtn"); // Bouton pour ouvrir la modale 2
  const modal1 = document.querySelector("#editGallery"); // Modale 1
  const modal2 = document.querySelector("#modal2"); // Modale 2
  const backButton = document.querySelector(".js-modal-back"); // Bouton pour revenir à la modale 1
  const closeButtons = document.querySelectorAll(".js-modal-close"); // Boutons pour fermer les modales
 
  
  // Fonction pour ouvrir la modale 2
  function openModal2() {
      modal1.style.display = "none"; // Cacher la modale 1
      modal2.style.display = "flex"; // Afficher la modale 2
  }
  
  // Fonction pour fermer la modale 2 et revenir à la modale 1
  function closeModal() {
      modal1.style.display = "flex"; // Afficher la modale 1
      modal2.style.display = "none"; // Cacher la modale 2
  }
  
  // Ajouter les écouteurs d'événements pour ouvrir la modale 2
  if (addPictureBtn) {
      addPictureBtn.addEventListener("click", openModal2);
  }
  
  // Ajouter les écouteurs d'événements pour revenir à la modale 1
  if (backButton) {
      backButton.addEventListener("click", closeModal);
  }
  
  // Ajouter les écouteurs d'événements pour fermer la modale depuis les boutons de fermeture
  if (closeButtons) {
      closeButtons.forEach(button => {
          button.addEventListener("click", closeModal);
      });
  }

  // Fonction qui génère les catégories dynamiquement pour la modale
  async function displayCategoryModal() {
    const select = document.querySelector("#modal2 select[name='category']"); // Assurez-vous que le sélecteur cible le bon élément
    const categories = await getCategories();

    if (select && categories) {
        select.innerHTML = ''; // Vider les options existantes

        // Créer une option par défaut
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Choisissez une catégorie';
        defaultOption.value = '';
        select.appendChild(defaultOption);

        // Ajouter les options des catégories
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // ID de la catégorie
            option.textContent = category.name; // Nom de la catégorie
            select.appendChild(option);
        });
    } else {
        console.error('Erreur : impossible de remplir le sélecteur de catégories');
    }
}
// Fonction pour ouvrir la modale d'ajout de photo
function openModal2() {
    modal1.style.display = "none"; // Cacher la modale 1
    modal2.style.display = "flex"; // Afficher la modale 2
    
    // Remplir le sélecteur de catégories lorsque la modale est ouverte
    displayCategoryModal();
}
