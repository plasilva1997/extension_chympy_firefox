/*Notification*/

function notification(onCheck){

    console.log("notfi");
    chrome.storage.local.get(["token","company"], function(items) {

        token = items.token;

        if (token !== null && token !== undefined && items.company !== null && items.company !== undefined) {


            let countCurrentCompany = JSON.parse(items["company"]).length;

            fetch("https://nfactory.hausplus.fr/api-chympy/", { //requete avec les données
                method: "GET",
                /*headers: {
                     "Content-Type": "application/json",
                     "Autorization": "Bearer "+token
                 },*/
            }).then(function (response) { //recuperation du json
                return response.json();
                // location.reload();
            }).then(function (data) {
                console.log(countCurrentCompany)
                console.log(data.length)

                if (countCurrentCompany !== data.length && data.length-countCurrentCompany>0) {
                    chrome.browserAction.setBadgeText({
                        text: (data.length - countCurrentCompany).toString()
                    });
                }

                if(onCheck){
                    chrome.browserAction.setBadgeText({
                        text: ""
                    });
                }
                chrome.storage.local.set({company: JSON.stringify(data)}, function() {});


            }).catch((error) => { //si il y a une erreur on redirige vers la page d'accueil
                console.log(error);
            });
        } else {
            chrome.browserAction.setBadgeText({
                text: ""
            });
        }
    });

    setTimeout(notification,10000000000); //on relance la requete toutes les heures

}

notification(false);
