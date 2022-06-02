/*Notification*/

function notification(onCheck){

    console.log("notfi");
    browser.storage.local.get(["token","company"], function(items) {

            token = items.token;

            if (token !== null && token !== undefined && items.company !== null && items.company !== undefined) {


                let countCurrentCompany = JSON.parse(items["company"]).length;

                fetch("https://api-chympy.plasilva.com/", { //requete avec les données
                    method: "GET",
                    /*headers: {
                         "Content-Type": "application/json",
                         "Autorization": "Bearer "+token
                     },*/
                }).then(function (response) { //recuperation du json
                    return response.json();

                }).then(function (data) {
                    console.log(countCurrentCompany)
                    console.log(data.length)

                    if (countCurrentCompany !== data.length) {
                        browser.browserAction.setBadgeText({
                            text: (data.length - countCurrentCompany).toString()
                        });
                    } else {
                        browser.browserAction.setBadgeText({
                            text: ""
                        });

                    }

                    if(onCheck){
                        browser.storage.local.set({company: JSON.stringify(data)}, function() {});
                    }

                }).catch((error) => { //si il y a une erreur on redirige vers la page d'accueil
                    console.log(error)
                });
            } else {
                browser.browserAction.setBadgeText({
                    text: ""
                });
            }
        });

    setTimeout(notification,5000);//check nouvelles offre toutes les heures

}

notification(false);
