/**
 * Ajoute un évènement au clique sur le boutton de logout
 */
document.getElementById("logout").addEventListener("click", logout);

function init_logout(){
    let submitLogout=document.getElementById("logout"); //recupere le boutton submit
    submitLogout.addEventListener("click", logout); //Ajoute la fonction au boutton logout
    check_expires_at(); //lance la verification de l'expiration du token
}

function logout() {
    /**
     * Vide le cache, donc le token. S'il n'y à pas de token la connexion ne fonctionne pas
     * donc l'utilisateur est déconnecté
     */
    browser.storage.local.clear(function () {
        window.location.replace("./index.html"); //redirection vers la page d'accueil
    });


}

function expires_at(token_at) {
    let currentTime = new Date().getTime(); //recupere le timestamp actuel
    let time = token_at; //recupere le timestamp de l'expiration
    let difference = (currentTime - time) / 1000; //calcul la difference entre le timestamp actuel et le timestamp de l'expiration

    if (difference >= 86390) { //si la difference est superieur a 86390 secondes
        logout();//on se deconnect quand le token est expiré environ 24 heure
    }
}