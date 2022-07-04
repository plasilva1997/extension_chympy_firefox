/**initiation des valeurs**/
const urlAPI = "https://chympy.net/api/";
let form = "";
let loading = "";
let errorMessageDiv = "";

init_extension();

/**
 * On récupère le token de connexion
 * S'il y a un token, on redirige vers le dashboard
 * Sinon on reste sur la page de connexion
 */
browser.storage.local.get(["token"], function (items) {
    let token = items.token;
    if (token !== null && token !== undefined) {
        window.location.replace("./dashboard.html");
    }
});

/**
 * Récupère les données d'initialisation de l'extension
 *
 */
function init_extension() {//recupere les infos de base pour l'extension


    let subimtAction = document.getElementById("submit");
    subimtAction.addEventListener("click", login); //Ajoute la fonction au boutton submit

    /**
     * Récupère les valeur du formulaire, loading et erreur
     */
    form = document.querySelector("#form-login");
    loading = document.querySelector("#loading");
    errorMessageDiv = document.querySelector("#error-message");
}

/**
 * Fonction de connexion
 */
function login() {

    /**
     * Récupère les valeurs des champs email et mot de passe
     */
    var login = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    /**
     * Requête POST pour la soumission du formulaire de connexion
     */
    fetch(urlAPI + "particuliers/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: login,
            password: password
        })
    })
        /**
         * Récupère les données soumises au format JSON
         */
        .then(function (response) {
            return response.json(); //recuperation du json
        })

        /**
         * Si les informations de connexion sont correctes on
         * -> cache le formulaire de connexion
         * -> crée une valeur token en cache
         * -> crée une valeur token_at en cache
         * -> récupère la liste des entreprises
         * -> récupère les catégories d'entreprises
         *
         * Sinon on affiche le message d'erreur
         */
        .then(function (data) {
            if (data['success'] !== false) {

                let d = new Date().getTime();
                form.style.display = "none";

                browser.storage.local.set({token: data['token']}, function () {
                });
                browser.storage.local.set({token_at: d.toString()}, function () {
                });

                getCompany();
                getCategory();

            } else {

                errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";

                //cache le loader
                loading.style.display = "none";
            }
        }).catch((error) => {
        errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
        // cache le loader
        loading.style.display = "none";
    });

    // affiche le loader
    loading.style.display = "flex";
}

/**
 * On récupère la liste des entreprises
 */
function getCompany() {
    /**
     * On récupère le token, si un token existe
     */
    browser.storage.local.get(["token"], function (items) {
        token = items.token;

        /**
         * Si le token existe, on fait une requête GET pour récupèrer la liste des entreprises
         */
        if (token !== null && token !== undefined) {

            fetch(urlAPI + "offres/find", { //requete avec les données
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Autorization": "Bearer " + token
                },
            })
                /**
                 * Récupèration des données au format JSON
                 */
                .then(function (response) {
                    return response.json();
                })
                /**
                 * On stock la liste des entreprises en cache
                 * puis on redirige vers le dashboard
                 */
                .then(function (data) {
                    browser.storage.local.set({company: JSON.stringify(data)}, function () {
                    });
                    window.location.replace("./dashboard.html");// redirection vers le dashboard
                })
                /**
                 * Intércepte les erreurs
                 * S'il y à des erreurs, affiche le message d'erreur
                 */
                .catch((error) => {
                    errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
                    //cache le loader
                    loading.style.display = "none";
                });
        }
    });
}

set_firefox_url();

function set_firefox_url() {
    /**
     * Récupère l'URL de la page actuelle de notre navigateur
     */
    browser.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        /**
         * S'il y à une URL, on stock l'URL actuelle
         * sinon on stock une URL par défaut
         */
        if (tabs[0].url !== null && tabs[0].url !== undefined) {
            browser.storage.local.set({urlFirefox: tabs[0].url}, function () {
            });
        } else {
            set_firefox_url();
        }
    });
}

function getCategory() {
    /**
     * Récupère le token en cache
     */
    browser.storage.local.get(["token"], function (items) {
        token = items.token;

        // On appel la fonction fetchAPI pour faire une requête GET de la liste des catégories
        let fetchCategory = fetchApi("categorie/find", 'GET', token, '');

        /**
         * S'il y à des catégories requêtée, on les stock en cache avec la valeur category
         * Sinon on console.log un message d'erreur
         */
        fetchCategory.then((data) => {
            if (data !== null && data !== undefined) {
                browser.storage.local.set({category: JSON.stringify(data)}, function () {
                });
            } else {
                console.log("Une erreur s'est produite lors de la recupération des catégories");
            }
        })
    });
}

