/*Notification*/

function notification(onCheck){

    chrome.storage.local.get(["token","company"], function(items) {

            token = items.token;

            if (token !== null && token !== undefined && items.company !== null && items.company !== undefined) {


                let countCurrentCompany = JSON.parse(items["company"]).length;

                fetch(urlAPI+"offres/find", { //requete avec les données
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         "Autorization": "Bearer "+token
                     },
                }).then(function (response) { //recuperation du json
                    return response.json();

                }).then(function (data) {

                    if (countCurrentCompany !== data.length) {
                        chrome.browserAction.setBadgeText({
                            text: (data.length - countCurrentCompany).toString()
                        });
                    } else {
                        chrome.browserAction.setBadgeText({
                            text: ""
                        });

                    }

                    if(onCheck){
                        chrome.storage.local.set({company: JSON.stringify(data)}, function() {});
                    }

                }).catch((error) => { //si il y a une erreur on redirige vers la page d'accueil
                    console.log(error)
                });
            } else {
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            }
        });

    setTimeout(notification,3600000);//check nouvelles offre toutes les heures

}

notification(false);
