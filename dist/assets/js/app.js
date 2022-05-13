
const url = window.location.toString()

// use `url` here inside the callback because it's asynchronous!
if (url === "https://www.caf.fr/") {
    let div = document.createElement("div");
    document.body.insertBefore(div, document.body.firstChild);

    div.innerText = "Hello World!";
    div.style.color = "red";
}