let form = "";
let loading = "";
let errorMessageDiv = "";

function init_extension() {//recupere les infos de base pour l'extension


    let subimtAction = document.getElementById("submit");
    subimtAction.addEventListener("click", login); //Ajoute la fonction au boutton submit

    form = document.querySelector("#form-login"); //Recupere le formulaire
    loading = document.querySelector("#loading"); //Recupere le loader
    errorMessageDiv = document.querySelector("#error-message");// recuper la div des erreurs
}