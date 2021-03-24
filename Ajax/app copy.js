var httpRequest = new XMLHttpRequest()

var links = document.querySelectorAll('.meteo') // récupère tous les elmts de classe meteo
var result = document.getElementById('result') // récupère l'elmnt avec id = result
for (var i = 0; i < links.length; i++) { // pour chaque elmnt de links
    var link = links[i] // on ajoute un evnmnt
    link.addEventListener('click', function (e) { // e => ce sont des liens
        e.preventDefault() // empêche la redirection en cliquant sur le lien
        result.innerHTML = 'Chargement...' // affichage 'temporaire'
        httpRequest.onreadystatechange = function () { // scrupte le changement d'état
            
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    // result.innerHTML = httpRequest.responseText
                    var results = JSON.parse(httpRequest.responseText) // récupère le résult de la requête et le parse
                    result.innerHTML = '' // efface l'affichage temporaire
                    var ul = document.createElement('ul') // Crée l'elmnt ul
                    result.appendChild(ul) // l'attache à result
                    for (var i = 0; i< results.length; i ++) {
                        var li = document.createElement('li')
                        li.innerHTML = results[i].name
                        ul.appendChild(li)
                    }

                } else {
                    alert('impossible de contacter le serveur')
                }
            }
            console.log(httpRequest)
        }
        
        httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/users', true) // True ou false : execution asynchrone ou non
        httpRequest.send()
    })
}
