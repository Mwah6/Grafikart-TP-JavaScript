var httpRequest = new XMLHttpRequest()
    var result = document.querySelector('#result')
    var form = document.querySelector('#form')


    form.addEventListener('submit', function (e) { // e => ce sont des liens
        e.preventDefault() // empêche la redirection en cliquant sur le lien
        result.innerHTML = 'Chargement...' // affichage 'temporaire'
        httpRequest.onreadystatechange = function () { // scrupte le changement d'état
            
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    result.innerHTML = httpRequest.responseText
                } else {
                    alert('impossible de contacter le serveur')
                }
            }
            console.log(httpRequest)
        }
        
        httpRequest.open('POST', '/demo.php', true)
        var data = new FormData(form) // va injecter automatiquement toutes les variable du formulaire
        httpRequest.send(data)

        // httpRequest.open('POST', '/demo.php', true)
        // var data = new FormData() // facilite l'envoie de données
        // var input = document.querySelector('#q')
        // data.append('q', input.value)
        // httpRequest.send(data)

        // httpRequest.open('POST', '/demo.php', true) // True ou false : execution asynchrone ou non
        // httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // // encodeURIComponent(a = "fzeerf") // Permet de communiquer avec le serveur les caractères spéciaux
        // httpRequest.send("city=Montpellier")

        // httpRequest.open('POST', '/demo.php', true)
        // var data = new FormData() // facilite l'envoie de données
        // data.append('city', 'vgezrbvtrh=zb')
        // data.append('name', 'marie')
        // httpRequest.send(data)
    
})

