//Appel la fonction login au clique sur le bouton submit

function login() {
    // Email de l'utilisateur
    var login = document.getElementById("email").value;
    // Mot de passe de l'utilisateur
    var password = document.getElementById("password").value;

    // Requête la route de login de l'api chympy
    return fetch("https://chympy.net/api/particuliers/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: login,
            password: password
        })
    }).then(function (response) {
        console.log(response);
        // Formatte la response en json
        return response.json();
    }).then(function (data) {
        console.log(data)

        // Stock le token en cache
        localStorage.setItem("token", data.token);
    });

}

document.getElementById("submitted").addEventListener("click", function (e) {
    e.preventDefault();
    login();
});
