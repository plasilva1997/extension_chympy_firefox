let form = "";
let loading = "";
let errorMessageDiv = "";

export function login() {

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
            form.style.display = "none"; //Cache le login si on est connecté
            browser.storage.local.set({token: data['token']}, function () {
            });
            let d = new Date().getTime();
            browser.storage.local.set({token_at: d.toString()}, function () {
            });
            getCompany();
        } else {
            errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
            loading.style.display = "none"; //cache le loader
        }
    }).catch((error) => {
        errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
        loading.style.display = "none"; //cache le loader
    });

    loading.style.display = "flex"; //Affiche le loader
}