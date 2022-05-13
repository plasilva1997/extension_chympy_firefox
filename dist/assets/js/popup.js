/*POUR L'HTML DE L'EXETENSION */

/*chrome.storage.local.remove(["token"],function(){
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
    console.log("fddsfsd")
})*/

const urlAPI = "https://chympy.net/api/";

var token = "";

firefox.storage.local.get(["token"], function (items) {

    token = items.token;
    if (token !== null && token !== undefined) {
        window.location.replace("./dashboard.html"); //redirige vers le dashboard si le token de connexion est toujours actif
    }

});

document.getElementById("submit").addEventListener("click", login); //Ajoute la fonction au boutton submit

let form = document.querySelector("#form-login"); //Recupere le formulaire
let loading = document.querySelector("#loading"); //Recupere le loader
let errorMessageDiv = document.querySelector("#error-message");// recuper la div des erreurs


function login() {

    var login = document.getElementById("email").value; //recuperation de l'email
    var password = document.getElementById("password").value; //recuperation du mot de passe

    fetch(urlAPI + "particuliers/login", { //requete avec les données
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: login,
            password: password
        })
    }).then(function (response) {
        return response.json(); //recuperation du json
    }).then(function (data) {
        if (data['success'] !== false) {
            chrome.storage.local.set({ token: data['token'] }, function () { });
            form.style.display = "none"; //Cache le login si on est connecté
            getCompany();
        } else {
            errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
            loading.style.display = "none"; //cache le loader
        }
    }).catch((error) => {
        errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
        loading.style.display = "none"; //cache le loader
        console.log(data)

        // Stock le token en cache
        localStorage.setItem("token", data.token);
    })
        .then(function () {
            window.location.replace("infos.html");// redirection vers le dashboard
        });

    loading.style.display = "flex"; //Affiche le loader
}


function getCompany() {

    chrome.storage.local.get(["token"], function (items) {

        token = items.token;
        if (token !== null && token !== undefined) {
            fetch(urlAPI + "offres/find", { //requete avec les données
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Autorization": "Bearer " + token
                },
            }).then(function (response) {
                return response.json(); //recuperation du json
            }).then(function (data) {
                chrome.storage.local.set({ company: JSON.stringify(data) }, function () { });
                window.location.replace("./dashboard.html");// redirection vers le dashboard
            }).catch((error) => {
                errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
                loading.style.display = "none"; //cache le loader
            });
        }
    });
}