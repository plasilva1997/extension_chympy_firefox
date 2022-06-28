/**
 * Ajoute un évènement au clique sur le boutton de logout
 */
document.getElementById("logout").addEventListener("click", logout);

function logout() {
    /**
     * Vide le cache, donc le token. S'il n'y à pas de token la connexion ne fonctionne pas
     * donc l'utilisateur est déconnecté
     */
    browser.storage.local.clear(function () {
        window.location.replace("./index.html"); //redirection vers la page d'accueil
    });
}