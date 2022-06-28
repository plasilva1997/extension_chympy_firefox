setTimeout(get_firefox_value, 250);
/**
 * Récupère la valeur des classes activeOne, activeTwo, activeThree
 * Et leur attribue un évènement qui appel une fonction au clique
 */
let activeClass = document.getElementById("activeOne");
activeClass.addEventListener("click", ActiveOne);

let activeClass2 = document.getElementById("activeTwo");
activeClass2.addEventListener("click", ActiveTwo);

let activeClass3 = document.getElementById("activeThree");
activeClass3.addEventListener("click", ActiveThree);


function ActiveOne() {
    var oldElement2 = document.getElementById("activeTwo");
    var element = document.getElementById("activeOne");
    var oldElement3 = document.getElementById("activeThree");
    var grid1 = document.getElementById("grid__paterns1");
    var grid2 = document.getElementById("grid__paterns");
    var grid3 = document.getElementById("grid__new__paterns");

    element.classList.add("active"); // on ajoute la classe active a la grid 1
    oldElement2.classList.remove("active"); // on retire la classe active a la grid 2
    oldElement3.classList.remove("active"); // on retire la classe active a la grid 3
    grid1.classList.remove("d-none"); // on ajoute la classe d'affichage a la grid 1
    grid2.classList.add("d-none"); // on retire la classe d'affichage a la grid 2
    grid3.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 3
}

function ActiveTwo() {
    var oldElement1 = document.getElementById("activeOne");
    var element = document.getElementById("activeTwo");
    var oldElement3 = document.getElementById("activeThree");
    var grid1 = document.getElementById("grid__paterns1");
    var grid2 = document.getElementById("grid__paterns");
    var grid3 = document.getElementById("grid__new__paterns");

    element.classList.add("active");
    oldElement1.classList.remove("active");
    oldElement3.classList.remove("active"); // on retire la classe active a la grid 3
    grid1.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 1
    grid2.classList.remove("d-none"); // on retire la classe d'affichage a la grid 2
    grid3.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 3

}

function ActiveThree() {
    var oldElement1 = document.getElementById("activeOne");
    var oldElement2 = document.getElementById("activeTwo");
    var element = document.getElementById("activeThree");
    var grid1 = document.getElementById("grid__paterns1");
    var grid2 = document.getElementById("grid__paterns");
    var grid3 = document.getElementById("grid__new__paterns");

    element.classList.add("active");
    oldElement1.classList.remove("active");
    oldElement2.classList.remove("active");
    grid1.classList.add("d-none"); // on ajoute la classe d'affichage a la grid 1
    grid2.classList.add("d-none"); // on retire la classe d'affichage a la grid 2
    grid3.classList.remove("d-none"); // on ajoute la classe d'affichage a la grid 3
}


function setInformationCompany(company, url, lastConnexion, categoryName) {

    browser.browserAction.setIcon({path: '/dist/assets/img/on.png'});

    let currentDayName = new Date().toLocaleDateString("en-EN", {weekday: 'long'}).toLowerCase();

    let gridPattern = document.querySelector("#grid__paterns");

    let isNewOffers = false;
    let existCompany = false;
    let currentCompanyCategory = null;
    let gridNewOffers = document.querySelector("#grid__newpattern");
    let buttonNewOffers = document.querySelector("#activeThree");
    let selectCategory = document.querySelector("#categorie-select");

    for (let c = 0; c < categoryName.length; c++) {
        console.log(categoryName[c].label);
        selectCategory.innerHTML += "<option value='" + categoryName[c]._id + "'>" + categoryName[c].label + "</option>"
    }

    selectCategory.addEventListener('change', loadstoreselected)
    for (let k = 0; k < company.length; k++) {  //parcours le tableau de magasins

        if (company[k] !== null && company[k] !== undefined) { //si le magasin existe

            let companyWebsite = company[k]['id_company']['socials']['website']; //recuperation du site web
            let companyCommercial_name = company[k]['id_company']['commercial_name']; //recuperation du nom du magasin

            if (companyWebsite !== null && companyWebsite !== "") { //si le site web existe


                if (url.includes(companyWebsite.replace(/\s/g, '')) && !existCompany) {

                    currentCompanyCategory = company[k]['id_company']['id_category']['label'];//categorie actuel du site à laquel se trouve le client
                    activeClass.classList.remove("d-none"); //affiche le boutton active


                    /*Informations l'entreprise*/
                    let infosPhoneDiv = document.querySelector("#infosPhone"); //div de l'information du partenaire
                    imgUrl = "https://chympy.net/" + company[k]['id_company']['pictures']['profile_pic'].replace("client/dist/mdb-angular-free/", "").trim(); //recuperation de l'image du partenaire
                    infosImg = "<div class='imgCommerce' style='background-image: url(" + encodeURI(imgUrl) + ")'></div>"; //affichage de l'image du partenaire
                    infosPhoneDiv.innerHTML += infosImg;
                    infosPhoneDiv.innerHTML += "<p>Téléphone : <a href='tel:" + company[k]['id_company']['phone'] + "'>" + company[k]['id_company']['phone'] + "</a></p>"; //affichage du numero de telephone du partenaire
                    infosPhoneDiv.innerHTML += "<p>Adresse : " + company[k]['id_company']['address'] + "</p>"; //affichage de l'adresse du partenaire
                    infosPhoneDiv.innerHTML += "<p>Description : " + company[k]['id_company']['presentation'] + "</p>"; //affichage de la description du partenaire


                    /*Information de l'entreprise*/
                    let infos = document.querySelector("#horaires"); //div de l'information de l'entreprise


                    if (company_open(new Date(), company[k]['id_company']['hours'][currentDayName]['open_hour'], company[k]['id_company']['hours'][currentDayName]['close_hour'])) {
                        infos.innerHTML += "<div id='name'><h2>" + companyCommercial_name + "</h2><div class='statusOpen'><div class='open'></div><p>Ouvert</p></div></div>";//Notification d'ouverture !
                    } else {
                        infos.innerHTML += "<div id='name'><h2>" + companyCommercial_name + "</h2><div class='statusOpen'><div class='closed'></div><p>Fermé</p></div></div>";//Notification d'ouverture !
                    }

                    /*Heures d'ouverture du partenaire en cours*/
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['monday']['closed'], "Lundi :", company[k]['id_company']['hours']['monday']['open_hour'], company[k]['id_company']['hours']['monday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['tuesday']['closed'], "Mardi :", company[k]['id_company']['hours']['tuesday']['open_hour'], company[k]['id_company']['hours']['tuesday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['wednesday']['closed'], "Mercredi :", company[k]['id_company']['hours']['wednesday']['open_hour'], company[k]['id_company']['hours']['wednesday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['thursday']['closed'], "Jeudi :", company[k]['id_company']['hours']['thursday']['open_hour'], company[k]['id_company']['hours']['thursday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['friday']['closed'], "Vendredi :", company[k]['id_company']['hours']['friday']['open_hour'], company[k]['id_company']['hours']['friday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['saturday']['closed'], "Samedi :", company[k]['id_company']['hours']['saturday']['open_hour'], company[k]['id_company']['hours']['saturday']['close_hour']);
                    infos.innerHTML += getOpened(company[k]['id_company']['hours']['sunday']['closed'], "Dimanche :", company[k]['id_company']['hours']['sunday']['open_hour'], company[k]['id_company']['hours']['sunday']['close_hour']);

                    "</div>";

                    existCompany = true; //permet d'eviter les heures en double ...
                }

                idUrl = 'link-' + companyWebsite;

                /*Patenaire de la meme catgeorie*/
                let gridSameCatgeory = document.querySelector("#grid__paterns1");

                if (company[k]['id_company']['id_category']['label'] === currentCompanyCategory && !url.includes(companyWebsite.replace(/\s/g, ''))) {//si la categorie du site client est egale a la catgeorie du site de la boucle alors ils font font partie de la meme categorie
                    gridSameCatgeory.innerHTML += "<a class='patern brown' id=" + idUrl + " href=" + companyWebsite + " target='_blank' class='patern'><h3>" + companyCommercial_name + "</h3></a>"; //ajout du nom du magasin dans la grid
                }


                let gridNewOffers = document.querySelector("#grid__new__paterns");

                const dateOffers = new Date(company[k]['id_company']['created_at']);
                const dateOffersTimestamp = dateOffers.getTime();

                let Lastoffer = dateOffersTimestamp;
                let LastConnectionCurrent = lastConnexion;
                if (!companyWebsite.includes("https://")) {//format les url en https
                    companyWebsite = "https://" + companyWebsite
                }
                if (lastConnexion < Lastoffer) {
                    console.log("new offer");
                    activeClass3.classList.remove("d-none");
                    activeClass3.addEventListener("click", function () {
                        notification(true);
                    });

                    gridNewOffers.innerHTML += "<a class='patern brow " + company[k]['id_company']['id_category']['_id'] + " store' id=" + idUrl + " href=" + companyWebsite + " target='_blank' class='patern'><h3>" + companyCommercial_name + "</h3></a>"; //ajout du nom du magasin dans la grid

                }

                if (!companyWebsite.includes("https://")) {//format les url en https
                    companyWebsite = "https://" + companyWebsite
                }
                /*tout les partenaires*/
                gridPattern.innerHTML += "<a class='patern " + company[k]['id_company']['id_category']['_id'] + " store' id=" + idUrl + " href=" + companyWebsite + " target='_blank' class='patern'><h3>" + companyCommercial_name + "</h3></a>"; //ajout du nom du magasin dans la grid

            }
        }
    }
    return true;
}

function getOpened(isClosed, day, open_at, close_at) {//cette fonction renvoie si le magasin est ouvert avec les heures ou non

    if (open_at === null) {
        open_at = "Non definis";
    }
    if (close_at === null) {
        close_at = "Non definis";
    }
    return isClosed ? "<p>" + day + " fermé</p>" : "<p>" + day + " " + open_at + " - " + close_at + "</p>";
}

function loadstoreselected(e) {

    let categoryID = e.target.value;
    let store = document.getElementsByClassName('store');

    for (let r = 0; r < store.length; r++) {
        console.log(store[r].className);
        if (categoryID === 'tout') {
            store[r].classList.remove('d-none');
        } else {
            if (!store[r].className.includes(categoryID)) {
                store[r].classList.add('d-none');
                console.log(store[r].className);

            } else {
                store[r].classList.remove('d-none');
            }
        }

    }

}


function get_chrome_value() {
    browser.storage.local.get(["company", "urlFirefox", "token", "token_at", "category"], function (items) { //recuperation des données de l'extension
        if (items['urlFirefox'] !== null && items['urlFirefox'] !== undefined) { //si le site web existe
            setInformationCompany(JSON.parse(items['company']), items['urlFirefox'], items['token_at'], JSON.parse(items["category"])); //affichage des informations
        } else {
            get_chrome_value();//fonction recurssive tant qu'on a pas l'url
        }
    });

}

function reformat_url(idUrl, url, tryReformat) {

    let link = document.getElementById(idUrl);
    tryReformat++;
    let newurl = "";

    if (tryReformat <= 4) {
        fetch(url, { //requete sur l'url formatter pour verifier si c'est un liens valide
            mode: "no-cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (response) {
            link = document.getElementById(idUrl);
            link.setAttribute("href", url);
            tryReformat = 0;

            if (response.status !== 200 || response.status === 0) {//si c'est pas une 200 ou si c'est une cors alors on affiche pas le liens
                if (link !== null) {
                    link.style.display = "none";
                }
            }
        }).catch((error) => {

            switch (tryReformat) {//Essaie different type d'url pour obtenir une url valide....
                case 1:
                    newurl = "https://www." + url.replace("https://", "");
                    break;
                case 2:
                    newurl = "http://" + url.replace("https://www.", "");
                    break;
                case 3:
                    newurl = "http://www." + url.replace("http://", "");
                    break;
                default:
                    newurl = url;
            }

            if (tryReformat === 4) {
                if (link != null) {
                    link.style.display = "none";
                }
            }

            // reformat_url(idUrl, newurl, tryReformat);//fonction recursive permettant de rappeler cette fonction pour essayer d'autre format d'url
        });
    }
}

function company_open(currentDay, openHours, closeHours) {//donne l'information si le magasin est ouvert en temps réel

    if (currentDay !== null && openHours !== null && closeHours !== null) {
        /*Heure et minute actuel*/
        let currentHours = currentDay.getHours();
        let currentMinute = currentDay.getMinutes();

        /*Heure d'ouveture du magsin*/
        let convertStringOpenHours = openHours;
        convertStringOpenHours = convertStringOpenHours.split("h");
        let convertOpenHours = parseInt(convertStringOpenHours[0]);
        let convertOpenMinutes = parseInt(convertStringOpenHours[1]) || 0;

        /*Heure de fermeture du magsin*/
        let convertStringCloseHours = closeHours;
        convertStringCloseHours = convertStringCloseHours.split("h");
        let convertCloseHours = parseInt(convertStringCloseHours[0]);
        let convertCloseMinutes = parseInt(convertStringCloseHours[1]) || 0;


        /*on calcul le nombre de secondes total */
        let currentTotalHours = currentHours * 3600 + currentMinute * 60;
        let openHoursTotal = convertOpenHours * 3600 + convertOpenMinutes * 60;
        let openCloseTotal = convertCloseHours * 3600 + convertCloseMinutes * 60;


        if (currentTotalHours >= openHoursTotal && currentTotalHours <= openCloseTotal) {//si l'heure du client se situe entre l'heure d'ouverture et de fermeture du site actuel alors il est notifier pas un ouver ou fermé
            return true;//Ouvert actuelement
        } else {
            return false;//fermé actuelement
        }
    } else {
        return false;//fermé actuelement
    }

}