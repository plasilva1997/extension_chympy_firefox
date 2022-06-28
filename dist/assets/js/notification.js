function notification(onCheck) {

    /**
     * Récupère les valeurs token et les entreprises dans le cache
     */
    browser.storage.local.get(["token", "company"], function (items) {

        token = items.token;

        /**
         * S'il y à un token ET une entreprise
         * fait une requête GET pour récupérer les données de l'API intermédiaire
         */
        if (token !== null && token !== undefined && items.company !== null && items.company !== undefined) {

            // compte le nombre d'entreprises
            let countCurrentCompany = JSON.parse(items["company"]).length;

            fetch("https://api-chympy.plasilva.com/", {
                method: "GET",
                /*headers: {
                     "Content-Type": "application/json",
                     "Autorization": "Bearer "+token
                 },*/
            })
                /**
                 * Récupère les données  du JSON
                 */
                .then(function (response) {
                    return response.json();
                })

                /**
                 * Compare le nombre d'entreprises en cache avec celle de l'api
                 * Si le nombre est différent, on met à jours les entreprises en cache
                 * et envoie une notification sur
                 */
                .then(function (data) {

                    if (countCurrentCompany !== data.length && data.length - countCurrentCompany > 0) {
                        browser.browserAction.setBadgeText({
                            text: (data.length - countCurrentCompany).toString()
                        });
                    }
                    if (onCheck) {
                        browser.browserAction.setBadgeText({
                            text: ""
                        });
                    }

                    browser.storage.local.set({company: JSON.stringify(data)}, function () {
                    });

                })
                /**
                 * Intercèpte les erreurs, s'il y en à, on redirige vers la page d'accueil
                 */
                .catch((error) => {
                    console.log(error);
                });
        } else {
            browser.browserAction.setBadgeText({
                text: ""
            });
        }
    });

    /**
     * Relance la requête pour comparer le nombres d'entreprises toutes les heures
     */
    setTimeout(notification, 10000000000);

}


notification(false);
