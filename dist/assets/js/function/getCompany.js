function getCompany() {

    browser.storage.local.get(["token"], function (items) {

        token = items.token;

        if (token !== null && token !== undefined) {
            fetch(urlAPI + "offres/find", { //requete avec les données
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Autorization": "Bearer " + token
                },
            }).then(function (response) { //recuperation du json
                return response.json();
            }).then(function (data) {
                browser.storage.local.set({company: JSON.stringify(data)}, function () {
                });
                window.location.replace("./dashboard.html");// redirection vers le dashboard
            }).catch((error) => { //si il y a une erreur on redirige vers la page d'accueil
                errorMessageDiv.innerHTML = "Une erreur s'est produites veuillez rééssayer";
                loading.style.display = "none"; //cache le loader
            });
        }
    });
}
