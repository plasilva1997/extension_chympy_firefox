function fetchApi(root, method, token, bodyValue) {

    let url = "https://chympy.net/api/" + root;
    let header = '';
    let headers = {};

    if (token !== undefined && token !== null && token !== '') {
        header = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };
    } else {
        header = {
            "Content-Type": "application/json"
        };
    }
    if (bodyValue !== undefined && bodyValue !== null && bodyValue !== '') {
        bodyValue = JSON.stringify(bodyValue);
    } else {
        bodyValue = '';
    }
    if(method === 'GET'){
        headers = {
            method: method,
            headers: header,
        };
    } else {
        headers = {
            method: method,
            headers: header,
            body: bodyValue,
        };
    }

    console.log(headers);
    let result = fetch(url, headers).then(function (response) {
        return response.json();
    }).then(function (data) {
        return data;
    }).catch(function (error) {
        return error;
    });

    return result;
}

function set_firefox_url(){
    browser.tabs.query({active: true, lastFocusedWindow: true}, tabs => { //recupere l'url de la page actuelle
        if(tabs[0].url!==null && tabs[0].url!==undefined){ //si il y a une url
            browser.storage.local.set({urlChrome: tabs[0].url}, function() {});//on stock l'url actuel
        }else{ //sinon on stock une url par defaut
            set_firefox_url();
        }
    });
}

