document.getElementById("logout").addEventListener("click", logout); //Ajoute la fonction au boutton logout
function logout() {
    console.log("logout");
    localStorage.clear(function () {
        var error = "";
        if (error) {
            console.error(error);
        }
        window.location.replace("./index.html"); //redirection vers la page d'accueil
    });
}