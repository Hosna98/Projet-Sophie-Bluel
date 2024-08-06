const baseApiUrl = "http://localhost:5678/api/";

document.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupération des éléments du formulaire
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Envoyer les données de connexion à l'API
        const response = await fetch(`${baseApiUrl}users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Vérification de la réponse de l'API
        if (!response.ok) {
            // Gestion des erreurs HTTP
            if (response.status === 401) {
                alert("Email ou mot de passe erronés");
            } else {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }
        } else {
            // Traitement de la réponse en cas de succès
            const data = await response.json();
            sessionStorage.setItem("token", data.token); // Stocker le token dans le sessionStorage
            window.location.replace("index.html"); // Rediriger vers la page d'accueil
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        alert("Une erreur est survenue, veuillez réessayer.");
    }
});