export function set_firefox_url() {
    browser.tabs.query({active: true, lastFocusedWindow: true}, tabs => { //recupere l'url de la page actuelle
        if (tabs[0].url !== null && tabs[0].url !== undefined) { //si il y a une url
            browser.storage.local.set({urlFirefox: tabs[0].url}, function () {
            });//on stock l'url actuel
        } else { //sinon on stock une url par defaut
            set_firefox_url();
        }
    });
}