document.getElementById("logout").addEventListener("click", logout); //Ajoute la fonction au boutton logout
function logout() {

    browser.storage.local.clear(function () {
        window.location.replace("./index.html"); //redirection vers la page d'accueil
    });
}