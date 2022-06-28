/**
 * Fonction de requête FETCH
 *
 * @param root
 * @param method
 * @param token
 * @param bodyValue
 */
function fetchApi(root, method, token, bodyValue) {

    let url = "https://chympy.net/api/" + root;
    let header = '';
    let headers = {};
    /**
     * S'il y à un token, on le renseigne en paramètre d'autorisation d'accès à l'API
     * Sinon on n'accède pas à l'API
     */
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

    /**
     * S'il y à des valeurs renseignée dans le corp de la requête on les converti au format JSON
     * Sinon la requête ne s'effectue pas
     */
    if (bodyValue !== undefined && bodyValue !== null && bodyValue !== '') {
        bodyValue = JSON.stringify(bodyValue);
    } else {
        bodyValue = '';
    }

    /**
     * Si la requête est de type GET, on met let valeur de paramètre method et header
     * Sinon on renseigne les paramètres method, header et bodyValue
     */
    if (method === 'GET') {
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

    /**
     * Requête fetch avec les paramètres et l'interception d'erreurs
     */
    let result = fetch(url, headers).then(function (response) {
        return response.json();
    }).then(function (data) {
        return data;
    }).catch(function (error) {
        return error;
    });

    return result;
}

function set_firefox_url() {
    /**
     * Récupère l'URL de la page actuelle du navigateur
     */
    browser.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        /**
         * S'il y à une URL on la stock en cache
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

