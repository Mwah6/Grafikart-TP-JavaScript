(function() {
    var afficherOnglet = function (a, animations ){
        if (animations === undefined) {
            animations = true;
        }
        var li = a.parentNode
        var div = a.parentNode.parentNode.parentNode
        var activeTab = div.querySelector('.tab-content.active')
        var aAfficher = div.querySelector(a.getAttribute('href'))
    
        if (li.classList.contains('active')) {
            return false // va stopper l'éxecution de la fonction
        }
        // On retire la classe active de l'onglet actif
        div.querySelector('.tabs .active').classList.remove('active')
        // On ajoute la classe active à l'onglet actuel
        li.classList.add('active')
    
        // On retire la classe active sur le contenu actif
        // div.querySelector('.tab-content.active').classList.remove('active')
        // On ajoute la classe active sur le contenu correspondant à mon clic
        // div.querySelector(a.getAttribute('href')).classList.add('active') 
   
        if (animations) {
            activeTab.classList.add('fade')
            activeTab.classList.remove('in')
            // On ajoute la classe fade sur l'élément actif
            // A la fin de l'animation
            var transitionend = function () {
                this.classList.remove('fade')
                this.classList.remove('active')
                aAfficher.classList.add('active') /* display: none; => display: block; : blocage des transitions CSS*/
                aAfficher.classList.add('fade')
                aAfficher.offsetWidth
                aAfficher.classList.add('in')
                activeTab.removeEventListener('transitioned', transitionend)
                // Lorsqu'on enchaine les modifications qui modifie le DOM, le navigateur ne les fait pas à la suite des autres
                // Il les enregistre toutes et les applique toutes d'un coup ("économie de ressources")
                // aAfficher.offsetWidth le force à appliquer les changements*/
            }
            activeTab.addEventListener('transitionend',  transitionend) 
            activeTab.addEventListener('webkitTransitionEnd',  transitionend) 
            activeTab.addEventListener('oTransitionEnd',  transitionend) 
        
    } else {
        aAfficher.classList.add('active')
        activeTab.classList.remove('active')
    }
        //      On retire la classe fade et active
        //      On ajoute la classe fade et active à l'élément à afficher
        //      On ajoute la classe in
    }
    var tabs = document.querySelectorAll('.tabs a')
    for (var i =0; i< tabs.length; i++) {
        tabs[i].addEventListener('click', function (e) {
            afficherOnglet(this)
        })
    }
    var hashchange = function (e) {
        var hash = window.location.hash
        var a = document.querySelector('a[href="' + hash + '"]')
        if (a !== null && !a.parentNode.classList.contains('active')) {
            afficherOnglet(a, e !== undefined)
        }
    }

    window.addEventListener('hashchange', hashchange)
    hashchange()
})()